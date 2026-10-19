import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientRequest } from 'http';
import * as https from 'https';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ProgressService } from '../progress/progress.service';
import { WorkoutService } from '../workout/workout.service';
import { TelegramUpdate } from './bot.types';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BotService.name);
  private botToken: string = process.env.TELEGRAM_BOT_TOKEN || '';
  private webAppUrl: string =
    process.env.TELEGRAM_WEBAPP_URL || 'http://localhost:3000';
  private isPolling = false;
  private currentPollReq: ClientRequest | null = null;
  private lastUpdateId = 0;
  private reminderInterval: NodeJS.Timeout | null = null;
  private retryTimeout: NodeJS.Timeout | null = null;
  private pendingVideoUploads = new Map<
    string,
    { fileId: string; timestamp: number }
  >();

  constructor(
    private readonly workoutService: WorkoutService,
    private readonly progressService: ProgressService,
  ) {}

  async onModuleInit() {
    this.botToken = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
    let url = (process.env.TELEGRAM_WEBAPP_URL || 'http://localhost:3000').trim();
    if ((url.startsWith("'") && url.endsWith("'")) || (url.startsWith('"') && url.endsWith('"'))) {
      url = url.slice(1, -1).trim();
    }
    this.webAppUrl = url.replace(/\/$/, '');

    if (!this.botToken) {
      this.logger.warn(
        '⚠️ TELEGRAM_BOT_TOKEN not found in environment. The bot service will run in standby mode. ' +
          'To connect your Telegram Bot, create a bot via @BotFather and set TELEGRAM_BOT_TOKEN in .env',
      );
      return;
    }

    this.connectBotWithRetry();
  }

  private async connectBotWithRetry(attempt = 1) {
    try {
      this.logger.log(
        `🤖 Connecting to Telegram Bot API via IPv4 (attempt ${attempt})...`,
      );
      const me = await this.telegramApi('getMe', null, 30000);
      if (me && me.ok) {
        this.logger.log(
          `🤖 Telegram Bot connected successfully: @${me.result.username} (${me.result.first_name})`,
        );
        // Ensure no lingering webhook blocks getUpdates
        try {
          await this.telegramApi('deleteWebhook', {
            drop_pending_updates: false,
          });
        } catch {}
        await this.setupMenuButton();
        this.startPolling();
        this.startReminderScheduler();
      } else {
        throw new Error(me?.description || 'Response not ok');
      }
    } catch (err: any) {
      this.logger.warn(
        `⚠️ Telegram Bot connection attempt ${attempt} failed: ${err.message}. Retrying in 5s...`,
      );
      this.retryTimeout = setTimeout(
        () => this.connectBotWithRetry(attempt + 1),
        5000,
      );
    }
  }

  onModuleDestroy() {
    this.stopPolling();
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }
    if (this.reminderInterval) {
      clearInterval(this.reminderInterval);
      this.reminderInterval = null;
    }
  }

  private async telegramApi(
    method: string,
    body?: any,
    timeoutMs = 30000,
    retries = method === 'getUpdates' ? 1 : 3,
  ): Promise<any> {
    if (!this.botToken) return null;

    let lastError: any;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await this.executeTelegramRequest(method, body, timeoutMs);
      } catch (err: any) {
        lastError = err;
        if (attempt < retries) {
          this.logger.warn(
            `⚠️ Telegram API "${method}" attempt ${attempt} failed: ${err.message}. Retrying in 1s...`,
          );
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
    throw lastError;
  }

  private executeTelegramRequest(
    method: string,
    body?: any,
    timeoutMs = 30000,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const postData = body ? JSON.stringify(body) : null;
      const options: https.RequestOptions = {
        hostname: 'api.telegram.org',
        path: `/bot${this.botToken}/${method}`,
        method: postData ? 'POST' : 'GET',
        family: 4, // Force IPv4 to bypass broken ISP IPv6 routing
        headers: {
          'Content-Type': 'application/json',
          ...(postData
            ? { 'Content-Length': Buffer.byteLength(postData) }
            : {}),
        },
        timeout: timeoutMs,
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (!parsed.ok) {
              this.logger.warn(
                `⚠️ Telegram API error on "${method}": ${parsed.description || JSON.stringify(parsed)}`,
              );
            }
            resolve(parsed);
          } catch {
            resolve({ ok: false, description: data });
          }
        });
      });

      req.on('error', (err) => reject(err));
      req.on('timeout', () => {
        req.destroy();
        reject(
          new Error(`Telegram API request timed out after ${timeoutMs}ms`),
        );
      });

      if (postData) {
        req.write(postData);
      }
      req.end();
    });
  }

  private async setupMenuButton() {
    if (!this.webAppUrl.startsWith('https://')) {
      this.logger.warn(
        `ℹ️ Telegram Chat Menu Web App button requires an HTTPS URL (current: ${this.webAppUrl}). ` +
          `Set TELEGRAM_WEBAPP_URL to an HTTPS tunnel or deployed URL to enable the Telegram Menu button.`,
      );
      return;
    }
    try {
      await this.telegramApi('setChatMenuButton', {
        menu_button: {
          type: 'web_app',
          text: '⚔️ FORTIS App',
          web_app: { url: this.webAppUrl },
        },
      });
      this.logger.log(
        `✅ Telegram Chat Menu button configured to URL: ${this.webAppUrl}`,
      );
    } catch (err: any) {
      this.logger.warn(`Could not set chat menu button: ${err.message}`);
    }
  }

  private getWebAppKeyboardRow(
    userId?: string,
    label = '🏋️ Open FORTIS App',
    tab?: string,
    session?: string,
  ): any[] {
    const isHttps = this.webAppUrl && this.webAppUrl.startsWith('https://');
    let fullUrl = this.webAppUrl;
    const params: string[] = [];
    if (userId) params.push(`user_id=${userId}`);
    if (tab) params.push(`tab=${tab}`);
    if (session) params.push(`session=${session}`);
    if (params.length > 0) {
      fullUrl += (fullUrl.includes('?') ? '&' : '?') + params.join('&');
    }

    if (userId) {
      this.logger.log(
        `🔗 [MINI APP URL DISPATCHED] User ${userId} [Button: "${label}"] -> ${fullUrl}`,
      );
    }

    if (isHttps) {
      return [{ text: label, web_app: { url: fullUrl } }];
    }
    return [
      {
        text: `${label} 🌐`,
        callback_data: `open_local_app:${userId || ''}`,
      },
    ];
  }

  private startPolling() {
    this.isPolling = true;
    this.pollLoop();
  }

  private stopPolling() {
    this.isPolling = false;
    if (this.currentPollReq) {
      this.currentPollReq.destroy();
      this.currentPollReq = null;
    }
  }

  private async pollLoop() {
    this.logger.log('📡 Starting Telegram update polling loop...');
    while (this.isPolling) {
      try {
        const data = await this.telegramApi(
          'getUpdates',
          { offset: this.lastUpdateId + 1, timeout: 20 },
          35000,
        );
        if (data && data.ok && Array.isArray(data.result)) {
          if (data.result.length > 0) {
            this.logger.log(
              `📥 Received ${data.result.length} update(s) from Telegram`,
            );
          }
          for (const update of data.result as TelegramUpdate[]) {
            this.lastUpdateId = update.update_id;
            await this.handleUpdate(update);
          }
        } else if (data && !data.ok) {
          if (data.error_code === 409) {
            this.logger.warn(
              '⚠️ Telegram 409 Conflict: Another bot instance is polling with this token. Waiting 5s...',
            );
            await new Promise((resolve) => setTimeout(resolve, 5000));
          } else {
            this.logger.warn(
              `⚠️ Telegram getUpdates returned not ok: ${JSON.stringify(data)}`,
            );
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
      } catch (err: any) {
        if (!this.isPolling) break;
        this.logger.warn(
          `⚠️ Telegram polling connection drop: ${err.message}. Reconnecting in 3s...`,
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }

  async handleUpdate(update: any) {
    // 1. Handle Inline Button Callbacks
    if (update.callback_query) {
      this.logger.log(
        `🔘 Button callback received: "${update.callback_query.data}" from user ${update.callback_query.from?.id}`,
      );
      await this.handleCallbackQuery(update.callback_query);
      return;
    }

    const message = update.message;
    if (!message) return;

    const chatId = message.chat.id;
    const user = message.from;
    const userId = user ? String(user.id) : String(chatId);
    const firstName = user?.first_name || 'Warrior';
    const username = user?.username ? `@${user.username}` : undefined;

    // Save Chat ID for automated reminders
    this.progressService.saveChatId(userId, chatId, firstName, username);

    // 2. Handle Video / Video Note / Video Document Messages
    const videoFileId =
      message.video?.file_id ||
      message.video_note?.file_id ||
      (message.document && message.document.mime_type?.startsWith('video/')
        ? message.document.file_id
        : null);

    if (videoFileId) {
      await this.handleIncomingVideo(
        chatId,
        userId,
        firstName,
        videoFileId,
        message.caption,
      );
      return;
    }

    // 3. Handle Text Messages & Command Routing
    if (!message.text) return;

    const text = message.text.trim();
    this.logger.log(
      `💬 Command received: "${text}" from ${firstName} (chatId: ${chatId})`,
    );

    // Check if user is replying to a video or answering a pending video upload
    const replyVideoFileId =
      message.reply_to_message?.video?.file_id ||
      message.reply_to_message?.video_note?.file_id ||
      (message.reply_to_message?.document?.mime_type?.startsWith('video/')
        ? message.reply_to_message.document.file_id
        : null);

    const pending = this.pendingVideoUploads.get(userId);
    const targetVideoFileId =
      replyVideoFileId ||
      (pending && Date.now() - pending.timestamp < 300000
        ? pending.fileId
        : null);

    if (targetVideoFileId && !text.startsWith('/')) {
      const matched = this.workoutService.findExerciseByQuery(text);
      if (matched) {
        this.pendingVideoUploads.delete(userId);
        await this.convertVideoToExerciseGif(
          chatId,
          userId,
          targetVideoFileId,
          matched,
        );
        return;
      }
    }

    if (text.startsWith('/start')) {
      await this.sendWelcomeMessage(chatId, firstName, userId);
    } else if (text.startsWith('/today')) {
      await this.sendTodayWorkout(chatId, userId);
    } else if (text.startsWith('/consistency')) {
      await this.sendConsistencyChart(chatId, userId, firstName);
    } else if (text.startsWith('/weight')) {
      await this.sendWeightChart(chatId, userId, firstName);
    } else if (text.startsWith('/progress') || text.startsWith('/stats')) {
      await this.sendProgressChart(chatId, userId, firstName);
    } else if (
      text.startsWith('/reminders') ||
      text.startsWith('/notifications')
    ) {
      await this.sendReminderSettings(chatId, userId);
    } else if (text.startsWith('/testreminder')) {
      await this.sendTestReminder(chatId, userId);
    } else if (
      text.startsWith('/setgif') ||
      text.startsWith('/gif') ||
      text.startsWith('/uploadgif')
    ) {
      const query = text.replace(/^\/(setgif|gif|uploadgif)\s*/i, '').trim();
      if (targetVideoFileId && query) {
        const matched = this.workoutService.findExerciseByQuery(query);
        if (matched) {
          this.pendingVideoUploads.delete(userId);
          await this.convertVideoToExerciseGif(
            chatId,
            userId,
            targetVideoFileId,
            matched,
          );
          return;
        }
      }
      await this.sendSetGifHelp(chatId, query);
    } else if (
      text.startsWith('/resetprofile') ||
      text.startsWith('/resetdata') ||
      text.startsWith('/deleteprofile')
    ) {
      await this.progressService.deleteUser(userId);
      await this.telegramApi('sendMessage', {
        chat_id: chatId,
        text:
          `🗑️ *Profile Reset Complete!*\n\n` +
          `All your workout checkmarks, streak history, and weight records have been permanently wiped from the database.\n\n` +
          `Send /start anytime to begin fresh with a clean slate!`,
        parse_mode: 'Markdown',
      });
    } else if (text.startsWith('/help')) {
      await this.sendHelpMessage(chatId);
    }
  }

  private async handleCallbackQuery(cb: any) {
    const callbackData = cb.data;
    const chatId = cb.message?.chat?.id;
    const userId = String(cb.from?.id);
    const firstName = cb.from?.first_name || 'Warrior';

    // Acknowledge callback
    await this.telegramApi('answerCallbackQuery', { callback_query_id: cb.id });

    if (callbackData.startsWith('set_gif:')) {
      const exerciseId = callbackData.split(':')[1];
      const pending = this.pendingVideoUploads.get(userId);
      if (!pending || Date.now() - pending.timestamp > 300000) {
        await this.telegramApi('sendMessage', {
          chat_id: chatId,
          text: `⚠️ *Upload session expired.* Please send your exercise video again!`,
          parse_mode: 'Markdown',
        });
        return;
      }

      try {
        const exercise = this.workoutService.getExercise(exerciseId);
        this.pendingVideoUploads.delete(userId);
        await this.convertVideoToExerciseGif(
          chatId,
          userId,
          pending.fileId,
          exercise,
        );
      } catch (e: any) {
        await this.telegramApi('sendMessage', {
          chat_id: chatId,
          text: `⚠️ Exercise not found: ${e.message}`,
        });
      }
      return;
    }

    if (callbackData.startsWith('open_local_app')) {
      const targetUserId = callbackData.split(':')[1] || userId;
      const fullUrl = `${this.webAppUrl}?user_id=${targetUserId}`;
      await this.telegramApi('sendMessage', {
        chat_id: chatId,
        text:
          `🌐 *FORTIS Web App Access*\n\n` +
          `Your personal workout portal URL:\n\`${fullUrl}\`\n\n` +
          `💡 *In-Telegram Mini App Mode:*\n` +
          `Telegram requires an HTTPS URL to launch Mini Apps inside the chat. Run an HTTPS tunnel (e.g. \`ngrok http 3005\`) and set \`TELEGRAM_WEBAPP_URL\` in \`.env\` to open FORTIS directly inside Telegram!`,
        parse_mode: 'Markdown',
      });
      return;
    }

    if (callbackData === 'view_consistency') {
      await this.sendConsistencyChart(chatId, userId, firstName);
    } else if (callbackData === 'view_weight') {
      await this.sendWeightChart(chatId, userId, firstName);
    } else if (callbackData === 'view_progress') {
      await this.sendProgressChart(chatId, userId, firstName);
    } else if (callbackData === 'toggle_notifications') {
      const user = this.progressService.getUserProgress(userId);
      const newStatus = !user.notificationsEnabled;
      this.progressService.setNotificationPreference({
        telegramId: userId,
        enabled: newStatus,
      });

      const statusText = newStatus
        ? '🔔 *Reminders Enabled!* You will receive morning (5:00 AM WAT) and evening (7:00 PM WAT) session calls until completed.'
        : '🔕 *Reminders Muted.* You will not receive automated training reminder calls.';

      await this.telegramApi('sendMessage', {
        chat_id: chatId,
        text: statusText,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: newStatus
                  ? '🔕 Mute Reminders'
                  : '🔔 Enable Reminders (5am & 7pm WAT)',
                callback_data: 'toggle_notifications',
              },
            ],
            this.getWebAppKeyboardRow(userId, '🏋️ Return to FORTIS App'),
          ],
        },
      });
    }
  }

  // ----------------------------------------------------------------
  // Video to Animated GIF Conversion Pipeline
  // ----------------------------------------------------------------
  private async handleIncomingVideo(
    chatId: number,
    userId: string,
    firstName: string,
    fileId: string,
    caption?: string,
  ) {
    this.logger.log(`📹 Video received from ${firstName} (userId: ${userId})`);

    // 1. Check if user provided an exercise name in caption
    if (caption && caption.trim()) {
      const cleanCaption = caption
        .replace(/^\/(gif|upload|setgif)\s*/i, '')
        .trim();
      const matched = this.workoutService.findExerciseByQuery(cleanCaption);
      if (matched) {
        await this.convertVideoToExerciseGif(chatId, userId, fileId, matched);
        return;
      }
    }

    // 2. No caption or no match: Store pending upload and ask user to choose
    this.pendingVideoUploads.set(userId, { fileId, timestamp: Date.now() });

    // Build buttons for today's exercises as convenient 1-tap options
    const todayPlan = this.workoutService.getTodayPlan();
    const todayExercises: { id: string; name: string }[] = [];
    if (todayPlan.morning?.abs) {
      todayPlan.morning.abs.forEach((a) => {
        try {
          const ex = this.workoutService.getExercise(a.exerciseId);
          if (!todayExercises.some((e) => e.id === ex.id)) {
            todayExercises.push({ id: ex.id, name: ex.name });
          }
        } catch {}
      });
    }
    if (todayPlan.evening?.groups) {
      todayPlan.evening.groups.forEach((g) => {
        g.exercises.forEach((item) => {
          try {
            const ex = this.workoutService.getExercise(item.exerciseId);
            if (!todayExercises.some((e) => e.id === ex.id)) {
              todayExercises.push({ id: ex.id, name: ex.name });
            }
          } catch {}
        });
      });
    }

    const inlineKeyboard: any[][] = [];
    const quickPick = todayExercises.slice(0, 6);
    for (let i = 0; i < quickPick.length; i += 2) {
      const row: any[] = [
        {
          text: `🎯 ${quickPick[i].name}`,
          callback_data: `set_gif:${quickPick[i].id}`,
        },
      ];
      if (quickPick[i + 1]) {
        row.push({
          text: `🎯 ${quickPick[i + 1].name}`,
          callback_data: `set_gif:${quickPick[i + 1].id}`,
        });
      }
      inlineKeyboard.push(row);
    }

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text:
        `🎬 *Video Received, ${firstName}!* \n\n` +
        `Which exercise illustration should be replaced with this demonstration?\n\n` +
        `👉 **Option 1**: Tap one of today's exercises below.\n` +
        `👉 **Option 2**: Reply directly to this message with any exercise name (e.g. \`goblet squat\` or \`floor press\`).`,
      parse_mode: 'Markdown',
      reply_markup:
        inlineKeyboard.length > 0 ? { inline_keyboard: inlineKeyboard } : undefined,
    });
  }

  private async convertVideoToExerciseGif(
    chatId: number,
    userId: string,
    fileId: string,
    exercise: { id: string; name: string },
  ) {
    let statusMsgId: number | null = null;
    try {
      const statusRes = await this.telegramApi('sendMessage', {
        chat_id: chatId,
        text: `⏳ *Processing Video...*\n\nDownloading and converting your demonstration into an optimized looping GIF for **${exercise.name}**...`,
        parse_mode: 'Markdown',
      });
      if (statusRes && statusRes.result) {
        statusMsgId = statusRes.result.message_id;
      }

      // 1. Get file path from Telegram
      const fileInfo = await this.telegramApi('getFile', { file_id: fileId });
      if (!fileInfo || !fileInfo.ok || !fileInfo.result?.file_path) {
        throw new Error('Could not retrieve video path from Telegram API.');
      }

      const telegramFilePath = fileInfo.result.file_path;
      const downloadUrl = `https://api.telegram.org/file/bot${this.botToken}/${telegramFilePath}`;

      // 2. Ensure directories exist and verify permissions
      const exercisesDir = path.resolve(
        process.cwd(),
        'public',
        'assets',
        'exercises',
      );
      if (!fs.existsSync(exercisesDir)) {
        try {
          fs.mkdirSync(exercisesDir, { recursive: true, mode: 0o777 });
        } catch {}
      }

      // Download temp files to OS temp directory (world-writable /tmp)
      const tempVideoPath = path.join(
        os.tmpdir(),
        `temp_vid_${Date.now()}_${fileId.slice(-6)}.mp4`,
      );
      const tempGifPath = path.join(
        os.tmpdir(),
        `temp_gif_${Date.now()}_${fileId.slice(-6)}.gif`,
      );
      const targetGifPath = path.join(exercisesDir, `${exercise.id}.gif`);

      // 3. Download the video file to /tmp
      const downloadRes = await fetch(downloadUrl);
      if (!downloadRes.ok) {
        throw new Error(`Failed to download video: ${downloadRes.statusText}`);
      }
      const arrayBuffer = await downloadRes.arrayBuffer();
      await fs.promises.writeFile(tempVideoPath, Buffer.from(arrayBuffer));

      // 4. Run FFmpeg to convert to looping animated GIF in /tmp
      await new Promise<void>((resolve, reject) => {
        // Limit to 8 seconds, 12 fps, 360px width with two-pass color palette
        const ffmpegCmd = `ffmpeg -y -i "${tempVideoPath}" -t 8 -vf "fps=12,scale=360:-2:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" "${tempGifPath}"`;
        exec(ffmpegCmd, (err, stdout, stderr) => {
          if (err) {
            this.logger.error(
              `FFmpeg conversion failed: ${stderr || err.message}`,
            );
            return reject(
              new Error(`FFmpeg conversion failed: ${stderr || err.message}`),
            );
          }
          resolve();
        });
      });

      // 5. Clean up temporary video file
      try {
        if (fs.existsSync(tempVideoPath)) {
          fs.unlinkSync(tempVideoPath);
        }
      } catch {}

      // 6. Copy generated GIF to public assets folder
      try {
        await fs.promises.copyFile(tempGifPath, targetGifPath);
        await fs.promises.chmod(targetGifPath, 0o666).catch(() => {});
      } catch (err: any) {
        this.logger.error(
          `Permission error saving to ${targetGifPath}: ${err.message}`,
        );
        if (err.code === 'EACCES') {
          throw new Error(
            `Permission denied saving to ${targetGifPath}.\n\nPlease run this on your VPS terminal:\n\`chmod -R 777 ./public/assets/exercises\``,
          );
        }
        throw err;
      } finally {
        try {
          if (fs.existsSync(tempGifPath)) {
            fs.unlinkSync(tempGifPath);
          }
        } catch {}
      }

      // Delete status progress message
      if (statusMsgId) {
        try {
          await this.telegramApi('deleteMessage', {
            chat_id: chatId,
            message_id: statusMsgId,
          });
        } catch {}
      }

      // 6. Send the generated GIF back to chat with WebApp button
      const webAppUrlWithUser = `${this.webAppUrl}?user_id=${userId}`;
      const captionText =
        `✅ *Exercise Illustration Updated!*\n\n` +
        `**${exercise.name}** now features your live animated demonstration in your FORTIS Mini App!\n\n` +
        `Tap below to open your training protocol and inspect your new illustration:`;

      await this.sendAnimationToChat(
        chatId,
        targetGifPath,
        captionText,
        webAppUrlWithUser,
      );

      this.logger.log(
        `🎬 Successfully converted and saved GIF for ${exercise.name} (${exercise.id}.gif)`,
      );
    } catch (err: any) {
      this.logger.error(
        `❌ Failed to convert video to GIF: ${err.message}`,
        err.stack,
      );
      if (statusMsgId) {
        try {
          await this.telegramApi('deleteMessage', {
            chat_id: chatId,
            message_id: statusMsgId,
          });
        } catch {}
      }
      await this.telegramApi('sendMessage', {
        chat_id: chatId,
        text: `❌ *Video Conversion Failed*\n\nReason: ${err.message}\n\nPlease ensure the video is under 20MB and in a standard format (MP4, MOV, WebM).`,
        parse_mode: 'Markdown',
      });
    }
  }

  private async sendAnimationToChat(
    chatId: number,
    gifPath: string,
    caption: string,
    webAppUrl: string,
  ) {
    try {
      const buffer = await fs.promises.readFile(gifPath);
      const form = new FormData();
      form.append('chat_id', String(chatId));
      form.append('caption', caption);
      form.append('parse_mode', 'Markdown');
      form.append(
        'reply_markup',
        JSON.stringify({
          inline_keyboard: [
            [
              {
                text: '🏋️ View in Mini App',
                web_app: { url: webAppUrl },
              },
            ],
          ],
        }),
      );
      form.append(
        'animation',
        new Blob([buffer], { type: 'image/gif' }),
        path.basename(gifPath),
      );

      const res = await fetch(
        `https://api.telegram.org/bot${this.botToken}/sendAnimation`,
        {
          method: 'POST',
          body: form,
        },
      );
      const data: any = await res.json();
      if (!data.ok) {
        this.logger.warn(
          `sendAnimation returned not ok: ${JSON.stringify(data)}`,
        );
        // Fallback to text message
        await this.telegramApi('sendMessage', {
          chat_id: chatId,
          text: caption,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🏋️ View in Mini App', web_app: { url: webAppUrl } }],
            ],
          },
        });
      }
    } catch (e: any) {
      this.logger.warn(`Failed to send animation: ${e.message}`);
    }
  }

  private async sendSetGifHelp(chatId: number, query?: string) {
    const text =
      `🎬 *Custom Exercise Video-to-GIF Illustration*\n\n` +
      `You can personalize your FORTIS Mini App with your own exercise demonstrations!\n\n` +
      `*How it works:*\n` +
      `1️⃣ Send or forward any short video or video note to this chat.\n` +
      `2️⃣ Include the exercise name in the video caption (e.g. \`goblet squat\` or \`floor press\`).\n` +
      `3️⃣ Or simply send the video first, then tap the exercise button or reply with its name!\n\n` +
      `The bot will automatically download your video, optimize it with FFmpeg into a crisp looping animated GIF, and save it directly into your Mini App!`;

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    });
  }

  // Welcome Message with the requested FORTIS branding and menu options
  private async sendWelcomeMessage(
    chatId: number,
    name: string,
    userId: string,
  ) {
    const user = this.progressService.getUserProgress(userId);
    const notifStatus = user.notificationsEnabled !== false;
    const isHttps = this.webAppUrl && this.webAppUrl.startsWith('https://');

    let text =
      `⚔️ *Welcome to FORTIS*\n` +
      `_STRENGTH THROUGH DISCIPLINE_\n` +
      `— † —\n\n` +
      `Welcome, *${name}*. Your full-body training and daily physical discipline starts here.\n\n` +
      `🔔 *Reminders:* ${notifStatus ? 'ACTIVE (5am & 7pm WAT)' : 'MUTED'}\n\n`;

    if (!isHttps) {
      text += `🌐 *Web App URL:* \`${this.webAppUrl}?user_id=${userId}\`\n\n`;
    }

    text += `Choose an option below to enter the arena or inspect your training metrics:`;

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          this.getWebAppKeyboardRow(userId, '🏋️ Open FORTIS App'),
          [
            {
              text: '📊 Consistency Chart',
              callback_data: 'view_consistency',
            },
            {
              text: '⚖️ Weight Charts',
              callback_data: 'view_weight',
            },
          ],
          [
            {
              text: '📈 Progress Chart',
              callback_data: 'view_progress',
            },
            {
              text: notifStatus ? '🔔 Reminders: ON' : '🔕 Reminders: OFF',
              callback_data: 'toggle_notifications',
            },
          ],
        ],
      },
    });
  }

  // Consistency Chart
  private async sendConsistencyChart(
    chatId: number,
    userId: string,
    name: string,
  ) {
    const user = this.progressService.getUserProgress(userId);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentWeek = this.progressService.getWeekKey();

    let chartText = `📊 *FORTIS — CONSISTENCY REPORT*\n_Strength Through Discipline_\n— † —\n\n`;
    chartText += `Athlete: *${name}*\n`;
    chartText += `🔥 *Current Streak:* ${user.streak || 0} Day${user.streak === 1 ? '' : 's'}\n\n`;
    chartText += `*Weekly Consistency Grid:*\n`;

    days.forEach((d) => {
      const amKey = `${currentWeek}|${d}|am|0`;
      const pmKey = `${currentWeek}|${d}|pm|0`;
      const amDone =
        user.completedItems && user.completedItems[amKey] ? '✅' : '⏳';
      const pmDone =
        user.completedItems && user.completedItems[pmKey] ? '✅' : '⏳';
      chartText += `• *${d}:* Morning ${amDone} | Evening ${pmDone}\n`;
    });

    const stats = this.progressService.getUserStats(userId);
    chartText += `\n📈 *Week Completion Rate:* ${stats.completionPercentage}%\n`;
    chartText += `Keep showing up daily. True strength is forged in consistency.`;

    if (!this.webAppUrl.startsWith('https://')) {
      chartText += `\n\n🌐 *Web App:* \`${this.webAppUrl}?user_id=${userId}\``;
    }

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text: chartText,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          this.getWebAppKeyboardRow(userId, '🏋️ Open FORTIS App'),
        ],
      },
    });
  }

  // Weight Chart
  private async sendWeightChart(chatId: number, userId: string, name: string) {
    const weights = this.progressService.getWeightHistory(userId);
    let text = `⚖️ *FORTIS — WEIGHT TRACKER*\n_Daily Weigh-in History (kg)_\n— † —\n\n`;
    text += `Athlete: *${name}*\n`;

    if (weights.length === 0) {
      text += `No weight logged yet.\n\nYou can input your body weight daily (in kg) right inside the FORTIS web app to chart your physical transformation!`;
    } else {
      const latest = weights[weights.length - 1];
      const start = weights[0];
      const diff = Math.round((latest.weight - start.weight) * 10) / 10;
      const diffSign = diff > 0 ? `+${diff}` : `${diff}`;

      text += `• *Current Weight:* ${latest.weight} kg (${latest.date})\n`;
      text += `• *Starting Weight:* ${start.weight} kg (${start.date})\n`;
      text += `• *Total Change:* ${diffSign} kg\n\n`;
      text += `*Recent Entries:*\n`;

      const recent = [...weights].reverse().slice(0, 7);
      recent.forEach((w) => {
        text += `  ▫️ ${w.date}: *${w.weight} kg*\n`;
      });
    }

    if (!this.webAppUrl.startsWith('https://')) {
      text += `\n\n🌐 *Web App:* \`${this.webAppUrl}?user_id=${userId}&tab=weight\``;
    }

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          this.getWebAppKeyboardRow(
            userId,
            '⚖️ Log Today’s Weight in App',
            'weight',
          ),
        ],
      },
    });
  }

  // Progress Chart
  private async sendProgressChart(
    chatId: number,
    userId: string,
    name: string,
  ) {
    const stats = this.progressService.getUserStats(userId);
    const plan = this.workoutService.getTodayPlan();

    const progressBar = this.generateAsciiProgressBar(
      stats.completionPercentage,
    );

    let text =
      `📈 *FORTIS — WEEKLY PROGRESS REPORT*\n` +
      `_Strength Through Discipline_\n— † —\n\n` +
      `Athlete: *${name}*\n` +
      `*${progressBar} ${stats.completionPercentage}%*\n\n` +
      `• *Total Drills Completed:* ${stats.completedCount} / ${stats.totalItems}\n` +
      `• *Active Streak:* ${stats.streak} day${stats.streak === 1 ? '' : 's'}\n` +
      `• *Today's Focus (${plan.fullName}):*\n` +
      `   🌅 ${plan.morning.skipping.title}\n` +
      `   🌙 ${plan.evening.label}\n\n` +
      `Discipline is choosing between what you want now and what you want most.`;

    if (!this.webAppUrl.startsWith('https://')) {
      text += `\n\n🌐 *Web App:* \`${this.webAppUrl}?user_id=${userId}\``;
    }

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          this.getWebAppKeyboardRow(userId, '🚀 Launch Workout App'),
        ],
      },
    });
  }

  private generateAsciiProgressBar(percent: number): string {
    const totalBars = 10;
    const filled = Math.min(
      totalBars,
      Math.max(0, Math.round((percent / 100) * totalBars)),
    );
    const empty = totalBars - filled;
    return `[${'■'.repeat(filled)}${'□'.repeat(empty)}]`;
  }

  private async sendTodayWorkout(chatId: number, userId?: string) {
    const plan = this.workoutService.getTodayPlan();
    let text = `⚔️ *FORTIS — TODAY'S TRAINING: ${plan.fullName.toUpperCase()}*\n_Strength Through Discipline_\n\n`;

    text += `🌅 *MORNING SESSION (Cardio & Core)*\n`;
    text += `• ${plan.morning.skipping.title} (${plan.morning.skipping.duration})\n`;
    text += `• *Abs Circuit:* ${plan.morning.abs.map((a) => a.exerciseId.replace(/_/g, ' ')).join(', ')}\n`;
    text += `• *Pelvic Floor:* 4 targeted exercises\n`;
    text += `• *Hip Mobility:* 4 mobility drills\n\n`;

    text += `🌙 *EVENING SESSION*\n`;
    text += `*${plan.evening.label}*\n`;
    if (plan.evening.subtitle) text += `_${plan.evening.subtitle}_\n`;

    if (plan.evening.groups.length > 0) {
      plan.evening.groups.forEach((g) => {
        text += `\n*${g.name}:*\n`;
        g.exercises.forEach((ex) => {
          text += `  ▫️ ${ex.exerciseId.replace(/_/g, ' ')} (${ex.prescription})\n`;
        });
      });
      if (plan.evening.finisher) {
        text += `\n⚡ *${plan.evening.finisher}*\n`;
      }
    } else if (plan.evening.note) {
      text += `_${plan.evening.note}_\n`;
    }

    if (!this.webAppUrl.startsWith('https://')) {
      text += `\n\n🌐 *Web App:* \`${this.webAppUrl}${userId ? `?user_id=${userId}` : ''}\``;
    }

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          this.getWebAppKeyboardRow(userId, '🏋️ Start Workout in App'),
        ],
      },
    });
  }

  // 5:00 AM & 7:00 PM WAT Automated Reminder Scheduler
  private startReminderScheduler() {
    this.logger.log(
      '⏰ Starting FORTIS Automated Reminder Scheduler (5:00 AM WAT & 7:00 PM WAT)...',
    );
    // Check every 10 minutes
    this.reminderInterval = setInterval(
      () => {
        this.checkAndSendReminders();
      },
      10 * 60 * 1000,
    );

    // Initial check after 10s
    setTimeout(() => this.checkAndSendReminders(), 10000);
  }

  private async checkAndSendReminders() {
    try {
      const now = new Date();
      // Format in WAT (West Africa Time, Africa/Lagos = UTC+1)
      const watTimeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Lagos',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      const [hour] = watTimeStr.split(':').map(Number);
      const todayDayKey = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Lagos',
        weekday: 'short',
      }).format(now);

      const users = this.progressService.getAllUsersForReminders();
      if (users.length === 0) return;

      // 1. Morning Window: 5:00 AM to 1:00 PM WAT
      if (hour >= 5 && hour < 13) {
        for (const user of users) {
          const isDone = this.progressService.isSessionCompleted(
            user.telegramId,
            todayDayKey,
            'am',
            11,
          );
          if (!isDone && user.chatId) {
            // Check if reminder was sent within last 2 hours
            const lastSent = user.lastMorningReminderSentAt
              ? new Date(user.lastMorningReminderSentAt).getTime()
              : 0;
            const hoursSince = (now.getTime() - lastSent) / (1000 * 60 * 60);

            if (hoursSince >= 2) {
              await this.sendMorningReminder(
                user.chatId,
                user.firstName || 'Athlete',
                user.telegramId,
              );
              this.progressService.updateReminderTimestamp(
                user.telegramId,
                'morning',
              );
            }
          }
        }
      }

      // 2. Evening Window: 7:00 PM (19:00) to 11:30 PM WAT
      if (hour >= 19 && hour <= 23) {
        for (const user of users) {
          const isDone = this.progressService.isSessionCompleted(
            user.telegramId,
            todayDayKey,
            'pm',
            7,
          );
          if (!isDone && user.chatId) {
            const lastSent = user.lastEveningReminderSentAt
              ? new Date(user.lastEveningReminderSentAt).getTime()
              : 0;
            const hoursSince = (now.getTime() - lastSent) / (1000 * 60 * 60);

            if (hoursSince >= 2) {
              await this.sendEveningReminder(
                user.chatId,
                user.firstName || 'Athlete',
                user.telegramId,
              );
              this.progressService.updateReminderTimestamp(
                user.telegramId,
                'evening',
              );
            }
          }
        }
      }
    } catch (err) {
      this.logger.error(`Error in reminder scheduler: ${err.message}`);
    }
  }

  private async sendMorningReminder(
    chatId: number,
    name: string,
    userId: string,
  ) {
    const plan = this.workoutService.getTodayPlan();
    let text =
      `⚔️ *FORTIS MORNING CALL — 5:00 AM WAT*\n` +
      `_STRENGTH THROUGH DISCIPLINE_\n— † —\n\n` +
      `Rise and conquer, *${name}*. Your morning session has not been finished yet!\n\n` +
      `🌅 *Today's Mission:*\n` +
      `• *Cardio:* ${plan.morning.skipping.title}\n` +
      `• *Abs:* Deep core & pelvic stability\n` +
      `• *Hip Mobility Flow*\n\n` +
      `Discipline demands consistency. Tap below to finish your morning workout:`;

    if (!this.webAppUrl.startsWith('https://')) {
      text += `\n\n🌐 *Web App:* \`${this.webAppUrl}?user_id=${userId}\``;
    }

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          this.getWebAppKeyboardRow(userId, '🏋️ Complete Morning Workout'),
        ],
      },
    });
  }

  private async sendEveningReminder(
    chatId: number,
    name: string,
    userId: string,
  ) {
    const plan = this.workoutService.getTodayPlan();
    let text =
      `⚔️ *FORTIS EVENING CALL — 7:00 PM WAT*\n` +
      `_STRENGTH THROUGH DISCIPLINE_\n— † —\n\n` +
      `Evening check-in, *${name}*. Your strength workout is still waiting.\n\n` +
      `🌙 *Tonight's Protocol:*\n` +
      `*${plan.evening.label}*\n` +
      `Do not let the day close without doing the work.\n\n` +
      `Step up to the weights and complete the session:`;

    if (!this.webAppUrl.startsWith('https://')) {
      text += `\n\n🌐 *Web App:* \`${this.webAppUrl}?user_id=${userId}&session=pm\``;
    }

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          this.getWebAppKeyboardRow(
            userId,
            '🏋️ Complete Evening Workout',
            undefined,
            'pm',
          ),
        ],
      },
    });
  }

  private async sendReminderSettings(chatId: number, userId: string) {
    const user = this.progressService.getUserProgress(userId);
    const enabled = user.notificationsEnabled !== false;

    let text =
      `🔔 *FORTIS TRAINING REMINDERS*\n` +
      `_STRENGTH THROUGH DISCIPLINE_\n— † —\n\n` +
      `Current Status: *${enabled ? 'ACTIVE ✅' : 'MUTED 🔕'}*\n\n` +
      `• *Morning Call:* 5:00 AM WAT\n` +
      `• *Evening Call:* 7:00 PM WAT\n\n` +
      `When active, FORTIS will send reminder notifications until your daily session is completed.`;

    if (!this.webAppUrl.startsWith('https://')) {
      text += `\n\n🌐 *Web App:* \`${this.webAppUrl}?user_id=${userId}\``;
    }

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: enabled ? '🔕 Mute Reminders' : '🔔 Enable Reminders',
              callback_data: 'toggle_notifications',
            },
          ],
          this.getWebAppKeyboardRow(userId, '🏋️ Open FORTIS App'),
        ],
      },
    });
  }

  private async sendTestReminder(chatId: number, userId: string) {
    await this.sendMorningReminder(chatId, 'Athlete', userId);
    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text: '✅ Test reminder dispatched successfully! Automated reminders will run at 5:00 AM WAT and 7:00 PM WAT.',
    });
  }

  private async sendHelpMessage(chatId: number) {
    const text =
      `⚔️ *FORTIS BOT COMMANDS*\n` +
      `_STRENGTH THROUGH DISCIPLINE_\n\n` +
      `/start - Launch FORTIS & access charts\n` +
      `/today - View today's morning & evening training protocol\n` +
      `/consistency - View 7-day consistency calendar & streaks\n` +
      `/weight - View weight history & weight delta\n` +
      `/progress - View weekly set completion rates\n` +
      `/testreminder - Test the 5am/7pm reminder notification\n` +
      `/resetprofile - Wipe all your history & weight data to start fresh\n` +
      `/help - Show this guide\n\n` +
      `🎬 *Exercise Video-to-GIF Demonstration:*\n` +
      `Send or forward any short workout video or video note (with the exercise name in the caption or tap the inline exercise buttons). FORTIS will convert it into a smooth looping GIF and showcase it directly in your Mini App!\n\n` +
      `You can also tap the *FORTIS App* menu button in the chat anytime!`;

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    });
  }
}
