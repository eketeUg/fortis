import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
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
  private abortController: AbortController | null = null;
  private lastUpdateId = 0;
  private reminderInterval: NodeJS.Timeout | null = null;

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

    try {
      const me = await this.telegramApi('getMe');
      if (me.ok) {
        this.logger.log(
          `🤖 Telegram Bot connected successfully: @${me.result.username} (${me.result.first_name})`,
        );
        await this.setupMenuButton();
        this.startPolling();
        this.startReminderScheduler();
      } else {
        this.logger.error(
          `Failed to connect Telegram Bot: ${JSON.stringify(me)}`,
        );
      }
    } catch (err) {
      this.logger.error(`Error connecting Telegram Bot: ${err.message}`);
    }
  }

  onModuleDestroy() {
    this.stopPolling();
    if (this.reminderInterval) {
      clearInterval(this.reminderInterval);
      this.reminderInterval = null;
    }
  }

  private async telegramApi(method: string, body?: any): Promise<any> {
    if (!this.botToken) return null;
    const url = `https://api.telegram.org/bot${this.botToken}/${method}`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const res = await fetch(url, options);
    return res.json();
  }

  private async setupMenuButton() {
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
    } catch (err) {
      this.logger.warn(`Could not set chat menu button: ${err.message}`);
    }
  }

  private startPolling() {
    this.isPolling = true;
    this.abortController = new AbortController();
    this.pollLoop();
  }

  private stopPolling() {
    this.isPolling = false;
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  private async pollLoop() {
    while (this.isPolling) {
      try {
        const res = await fetch(
          `https://api.telegram.org/bot${this.botToken}/getUpdates?offset=${this.lastUpdateId + 1}&timeout=30`,
          { signal: this.abortController?.signal },
        );
        const data = await res.json();
        if (data.ok && Array.isArray(data.result)) {
          for (const update of data.result as TelegramUpdate[]) {
            this.lastUpdateId = update.update_id;
            await this.handleUpdate(update);
          }
        }
      } catch (err: any) {
        if (err.name === 'AbortError') break;
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }

  async handleUpdate(update: any) {
    // 1. Handle Inline Button Callbacks
    if (update.callback_query) {
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

    // Save Chat ID for automated reminders
    this.progressService.saveChatId(userId, chatId, firstName, username);

    if (text.startsWith('/start')) {
      await this.sendWelcomeMessage(chatId, firstName, userId);
    } else if (text.startsWith('/today')) {
      await this.sendTodayWorkout(chatId);
    } else if (text.startsWith('/consistency')) {
      await this.sendConsistencyChart(chatId, userId, firstName);
    } else if (text.startsWith('/weight')) {
      await this.sendWeightChart(chatId, userId, firstName);
    } else if (text.startsWith('/progress') || text.startsWith('/stats')) {
      await this.sendProgressChart(chatId, userId, firstName);
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

    if (callbackData === 'view_consistency') {
      await this.sendConsistencyChart(chatId, userId, firstName);
    } else if (callbackData === 'view_weight') {
      await this.sendWeightChart(chatId, userId, firstName);
    } else if (callbackData === 'view_progress') {
      await this.sendProgressChart(chatId, userId, firstName);
    }
  }

  // Welcome Message with the requested FORTIS branding and menu options
  private async sendWelcomeMessage(
    chatId: number,
    name: string,
    userId: string,
  ) {
    const appUrl = `${this.webAppUrl}?user_id=${userId}`;

    const text =
      `⚔️ *Welcome to FORTIS*\n` +
      `_STRENGTH THROUGH DISCIPLINE_\n` +
      `— † —\n\n` +
      `Welcome, *${name}*. Your full-body training and daily physical discipline starts here.\n\n` +
      `Choose an option below to enter the arena or inspect your training metrics:`;

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🏋️ Open FORTIS App',
              web_app: { url: appUrl },
            },
          ],
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

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text: chartText,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🏋️ Open FORTIS App',
              web_app: { url: `${this.webAppUrl}?user_id=${userId}` },
            },
          ],
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

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '⚖️ Log Today’s Weight in App',
              web_app: {
                url: `${this.webAppUrl}?user_id=${userId}&tab=weight`,
              },
            },
          ],
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

    const text =
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

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🚀 Launch Workout App',
              web_app: { url: `${this.webAppUrl}?user_id=${userId}` },
            },
          ],
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

  private async sendTodayWorkout(chatId: number) {
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

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🏋️ Start Workout in App',
              web_app: { url: this.webAppUrl },
            },
          ],
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

      const users = this.progressService.getAllUsersWithChat();
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
    const text =
      `⚔️ *FORTIS MORNING CALL — 5:00 AM WAT*\n` +
      `_STRENGTH THROUGH DISCIPLINE_\n— † —\n\n` +
      `Rise and conquer, *${name}*. Your morning session has not been finished yet!\n\n` +
      `🌅 *Today's Mission:*\n` +
      `• *Cardio:* ${plan.morning.skipping.title}\n` +
      `• *Abs:* Deep core & pelvic stability\n` +
      `• *Hip Mobility Flow*\n\n` +
      `Discipline demands consistency. Tap below to finish your morning workout:`;

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🏋️ Complete Morning Workout',
              web_app: { url: `${this.webAppUrl}?user_id=${userId}` },
            },
          ],
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
    const text =
      `⚔️ *FORTIS EVENING CALL — 7:00 PM WAT*\n` +
      `_STRENGTH THROUGH DISCIPLINE_\n— † —\n\n` +
      `Evening check-in, *${name}*. Your strength workout is still waiting.\n\n` +
      `🌙 *Tonight's Protocol:*\n` +
      `*${plan.evening.label}*\n` +
      `Do not let the day close without doing the work.\n\n` +
      `Step up to the weights and complete the session:`;

    await this.telegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🏋️ Complete Evening Workout',
              web_app: {
                url: `${this.webAppUrl}?user_id=${userId}&session=pm`,
              },
            },
          ],
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
