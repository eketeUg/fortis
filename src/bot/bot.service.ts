import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientRequest } from 'http';
import * as https from 'https';
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

  constructor(
    private readonly workoutService: WorkoutService,
    private readonly progressService: ProgressService,
  ) {}

  async onModuleInit() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    this.webAppUrl = process.env.TELEGRAM_WEBAPP_URL || 'http://localhost:3000';

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

    // 2. Handle Text Messages
    if (!update.message || !update.message.text) return;

    const chatId = update.message.chat.id;
    const text = update.message.text.trim();
    const user = update.message.from;
    const userId = user ? String(user.id) : String(chatId);
    const firstName = user?.first_name || 'Warrior';
    const username = user?.username ? `@${user.username}` : undefined;

    this.logger.log(
      `💬 Command received: "${text}" from ${firstName} (chatId: ${chatId})`,
    );

    // Save Chat ID for automated reminders
    this.progressService.saveChatId(userId, chatId, firstName, username);

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
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const todayDayKey = days[now.getDay()];

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
      `/help - Show this guide\n\n` +
      `You can also tap the *FORTIS App* menu button in the chat anytime!`;

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    });
  }
}
