import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import mongoose from 'mongoose';
import * as path from 'path';
import { getUserProgressModel } from './progress.schema';
import {
  LogWeightDto,
  ProgressStats,
  SyncProgressDto,
  ToggleNotificationDto,
  UserProgress,
  WeightEntry,
} from './progress.types';

@Injectable()
export class ProgressService implements OnModuleInit {
  private readonly logger = new Logger(ProgressService.name);
  private readonly storagePath = path.resolve(
    process.cwd(),
    '.data',
    'progress.json',
  );
  private userStore: Map<string, UserProgress> = new Map();
  private isMongoConnected = false;

  constructor() {
    this.ensureStorage();
    this.loadFromDisk();
  }

  async onModuleInit() {
    await this.connectMongo();
  }

  private async connectMongo() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      this.logger.warn(
        'ℹ️ MONGO_URI not provided. ProgressService using local file persistence.',
      );
      return;
    }

    try {
      await mongoose.connect(uri);
      this.isMongoConnected = true;
      this.logger.log(
        '🍃 Connected to MongoDB successfully. Loading cloud user data...',
      );
      await this.loadFromMongo();
    } catch (err) {
      this.logger.error(
        `Failed to connect to MongoDB: ${err.message}. Falling back to disk storage.`,
      );
    }
  }

  private async loadFromMongo() {
    try {
      const model = getUserProgressModel();
      const docs = await model.find().exec();
      for (const doc of docs) {
        const completedObj: Record<string, boolean> = {};
        if (doc.completedItems) {
          if (doc.completedItems instanceof Map) {
            for (const [k, v] of doc.completedItems.entries()) {
              completedObj[k] = v;
            }
          } else {
            Object.assign(completedObj, doc.completedItems);
          }
        }

        const user: UserProgress = {
          telegramId: doc.telegramId,
          chatId: doc.chatId,
          username: doc.username,
          firstName: doc.firstName,
          currentWeek: doc.currentWeek || this.getWeekKey(),
          completedItems: completedObj,
          weightHistory: doc.weightHistory || [],
          streak: doc.streak || 0,
          lastActiveDate: doc.lastActiveDate || '',
          completedDays: doc.completedDays || [],
          totalWorkoutsCompleted: doc.totalWorkoutsCompleted || 0,
          notificationsEnabled: doc.notificationsEnabled !== false,
          lastMorningReminderSentAt: doc.lastMorningReminderSentAt,
          lastEveningReminderSentAt: doc.lastEveningReminderSentAt,
          updatedAt: doc.updatedAt
            ? doc.updatedAt.toISOString()
            : new Date().toISOString(),
        };

        this.userStore.set(user.telegramId, user);
      }
      this.logger.log(`🍃 Synced ${docs.length} users from MongoDB.`);
      this.saveToDisk(); // Update local disk cache
    } catch (err) {
      this.logger.warn(`Could not load users from MongoDB: ${err.message}`);
    }
  }

  private async persistUserToMongo(user: UserProgress) {
    if (!this.isMongoConnected) return;
    try {
      const model = getUserProgressModel();
      const completedMap = new Map<string, boolean>();
      for (const [k, v] of Object.entries(user.completedItems || {})) {
        completedMap.set(k, v);
      }

      await model
        .findOneAndUpdate(
          { telegramId: user.telegramId },
          {
            $set: {
              chatId: user.chatId,
              username: user.username,
              firstName: user.firstName,
              currentWeek: user.currentWeek,
              completedItems: completedMap,
              weightHistory: user.weightHistory,
              streak: user.streak,
              lastActiveDate: user.lastActiveDate,
              completedDays: user.completedDays,
              totalWorkoutsCompleted: user.totalWorkoutsCompleted,
              notificationsEnabled: user.notificationsEnabled,
              lastMorningReminderSentAt: user.lastMorningReminderSentAt,
              lastEveningReminderSentAt: user.lastEveningReminderSentAt,
            },
          },
          { upsert: true, returnDocument: 'after' },
        )
        .exec();
    } catch (err) {
      this.logger.warn(
        `Failed to persist user ${user.telegramId} to MongoDB: ${err.message}`,
      );
    }
  }

  private ensureStorage() {
    const dir = path.dirname(this.storagePath);
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (err) {
        this.logger.warn(`Could not create storage directory: ${err.message}`);
      }
    }
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.storagePath)) {
        const raw = fs.readFileSync(this.storagePath, 'utf8');
        const parsed = JSON.parse(raw);
        for (const [key, val] of Object.entries(parsed)) {
          const user = val as UserProgress;
          if (!user.weightHistory) user.weightHistory = [];
          if (user.notificationsEnabled === undefined)
            user.notificationsEnabled = true;
          this.userStore.set(key, user);
        }
        this.logger.log(
          `Loaded progress data for ${this.userStore.size} users from local disk.`,
        );
      }
    } catch (err) {
      this.logger.warn(
        `Failed to read progress file from disk: ${err.message}`,
      );
    }
  }

  private saveToDisk() {
    try {
      this.ensureStorage();
      const obj: Record<string, UserProgress> = {};
      for (const [k, v] of this.userStore.entries()) {
        obj[k] = v;
      }
      fs.writeFileSync(this.storagePath, JSON.stringify(obj, null, 2), 'utf8');
    } catch (err) {
      this.logger.warn(`Failed to persist progress to disk: ${err.message}`);
    }
  }

  getWeekKey(): string {
    const d = new Date();
    const day = (d.getDay() + 6) % 7; // Monday = 0
    d.setDate(d.getDate() - day);
    return d.toISOString().slice(0, 10);
  }

  getTodayDateString(): string {
    return new Date().toISOString().slice(0, 10);
  }

  validateTelegramInitData(initData: string, botToken: string): boolean {
    if (!initData || !botToken) return false;
    try {
      const urlParams = new URLSearchParams(initData);
      const hash = urlParams.get('hash');
      if (!hash) return false;
      urlParams.delete('hash');

      const dataCheckString = Array.from(urlParams.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${v}`)
        .join('\n');

      const secretKey = crypto
        .createHmac('sha256', 'WebAppData')
        .update(botToken)
        .digest();
      const calculatedHash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

      return calculatedHash === hash;
    } catch {
      return false;
    }
  }

  getUserProgress(telegramId: string): UserProgress {
    const id = telegramId || 'guest';
    const currentWeek = this.getWeekKey();

    let user = this.userStore.get(id);
    if (!user) {
      user = {
        telegramId: id,
        currentWeek,
        completedItems: {},
        weightHistory: [],
        streak: 0,
        lastActiveDate: '',
        completedDays: [],
        totalWorkoutsCompleted: 0,
        notificationsEnabled: true,
        updatedAt: new Date().toISOString(),
      };
      this.userStore.set(id, user);
      this.saveToDisk();
      this.persistUserToMongo(user);
    }

    if (!user.weightHistory) {
      user.weightHistory = [];
    }
    if (user.notificationsEnabled === undefined) {
      user.notificationsEnabled = true;
    }

    // Reset weekly items if we entered a new week
    if (user.currentWeek !== currentWeek) {
      user.currentWeek = currentWeek;
      user.updatedAt = new Date().toISOString();
      this.saveToDisk();
      this.persistUserToMongo(user);
    }

    return user;
  }

  saveChatId(
    telegramId: string,
    chatId: number,
    firstName?: string,
    username?: string,
  ): UserProgress {
    const user = this.getUserProgress(telegramId);
    user.chatId = chatId;
    if (firstName) user.firstName = firstName;
    if (username) user.username = username;
    this.saveToDisk();
    this.persistUserToMongo(user);
    return user;
  }

  syncProgress(dto: SyncProgressDto): UserProgress {
    const id = dto.telegramId || 'guest';
    const currentWeek = dto.weekKey || this.getWeekKey();
    const today = this.getTodayDateString();

    const user = this.getUserProgress(id);
    if (dto.username) user.username = dto.username;
    if (dto.firstName) user.firstName = dto.firstName;
    if (dto.chatId) user.chatId = dto.chatId;
    if (dto.notificationsEnabled !== undefined) {
      user.notificationsEnabled = dto.notificationsEnabled;
    }

    // Merge completed items
    user.completedItems = {
      ...user.completedItems,
      ...dto.completedItems,
    };

    // Calculate streak
    if (dto.markActive !== false) {
      if (user.lastActiveDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);

        if (user.lastActiveDate === yesterdayStr) {
          user.streak = (user.streak || 0) + 1;
        } else if (user.lastActiveDate === '') {
          user.streak = 1;
        } else {
          user.streak = 1;
        }
        user.lastActiveDate = today;
      }
    }

    // Recalculate total completed items for this week
    const currentWeekItems = Object.entries(user.completedItems).filter(
      ([k, v]) => k.startsWith(currentWeek) && v === true,
    );
    user.totalWorkoutsCompleted = currentWeekItems.length;
    user.updatedAt = new Date().toISOString();

    this.userStore.set(id, user);
    this.saveToDisk();
    this.persistUserToMongo(user);

    return user;
  }

  // Notification Opt-in / Opt-out
  setNotificationPreference(dto: ToggleNotificationDto): UserProgress {
    const user = this.getUserProgress(dto.telegramId);
    user.notificationsEnabled = dto.enabled;
    user.updatedAt = new Date().toISOString();
    this.saveToDisk();
    this.persistUserToMongo(user);
    this.logger.log(
      `🔔 User ${user.telegramId} notification preference set to: ${user.notificationsEnabled}`,
    );
    return user;
  }

  // Daily Weight Tracking (in kg)
  logWeight(dto: LogWeightDto): WeightEntry[] {
    const user = this.getUserProgress(dto.telegramId);
    const date = dto.date || this.getTodayDateString();
    const roundedWeight = Math.round(dto.weight * 10) / 10;

    const existingIndex = user.weightHistory.findIndex((w) => w.date === date);
    const entry: WeightEntry = {
      date,
      weight: roundedWeight,
      timestamp: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      user.weightHistory[existingIndex] = entry;
    } else {
      user.weightHistory.push(entry);
    }

    user.weightHistory.sort((a, b) => a.date.localeCompare(b.date));
    user.updatedAt = new Date().toISOString();

    this.saveToDisk();
    this.persistUserToMongo(user);
    return user.weightHistory;
  }

  getWeightHistory(telegramId: string): WeightEntry[] {
    const user = this.getUserProgress(telegramId);
    return user.weightHistory || [];
  }

  deleteWeight(telegramId: string, date: string): WeightEntry[] {
    const user = this.getUserProgress(telegramId);
    user.weightHistory = (user.weightHistory || []).filter(
      (w) => w.date !== date,
    );
    this.saveToDisk();
    this.persistUserToMongo(user);
    return user.weightHistory;
  }

  resetWeek(telegramId: string): UserProgress {
    const id = telegramId || 'guest';
    const user = this.getUserProgress(id);
    const currentWeek = this.getWeekKey();

    const newCompletedItems: Record<string, boolean> = {};
    for (const [k, v] of Object.entries(user.completedItems)) {
      if (!k.startsWith(currentWeek)) {
        newCompletedItems[k] = v;
      }
    }

    user.completedItems = newCompletedItems;
    user.updatedAt = new Date().toISOString();
    this.userStore.set(id, user);
    this.saveToDisk();
    this.persistUserToMongo(user);

    return user;
  }

  getUserStats(telegramId: string, totalWeekItems: number = 84): ProgressStats {
    const user = this.getUserProgress(telegramId);
    const currentWeek = this.getWeekKey();

    const completedThisWeek = Object.entries(user.completedItems).filter(
      ([k, v]) => k.startsWith(currentWeek) && v === true,
    ).length;

    const percentage =
      totalWeekItems > 0
        ? Math.round((completedThisWeek / totalWeekItems) * 100)
        : 0;

    const weights = user.weightHistory || [];
    const latestWeight =
      weights.length > 0 ? weights[weights.length - 1].weight : undefined;
    const weightStart = weights.length > 0 ? weights[0].weight : undefined;
    const weightChange =
      latestWeight !== undefined && weightStart !== undefined
        ? Math.round((latestWeight - weightStart) * 10) / 10
        : undefined;

    return {
      weekKey: currentWeek,
      totalItems: totalWeekItems,
      completedCount: completedThisWeek,
      completionPercentage: Math.min(100, percentage),
      streak: user.streak || 0,
      daysCompletedThisWeek: 0,
      latestWeight,
      weightStart,
      weightChange,
      notificationsEnabled: user.notificationsEnabled !== false,
    };
  }

  // Returns only users who opted IN to notifications (notificationsEnabled !== false)
  getAllUsersForReminders(): UserProgress[] {
    return Array.from(this.userStore.values()).filter(
      (u) => u.chatId !== undefined && u.notificationsEnabled !== false,
    );
  }

  isSessionCompleted(
    telegramId: string,
    day: string,
    session: 'am' | 'pm',
    expectedCount: number,
  ): boolean {
    const user = this.getUserProgress(telegramId);
    const currentWeek = this.getWeekKey();
    let completedCount = 0;
    for (let i = 0; i < expectedCount; i++) {
      const k = `${currentWeek}|${day}|${session}|${i}`;
      if (user.completedItems && user.completedItems[k] === true) {
        completedCount++;
      }
    }
    return completedCount >= expectedCount && expectedCount > 0;
  }

  updateReminderTimestamp(telegramId: string, type: 'morning' | 'evening') {
    const user = this.getUserProgress(telegramId);
    const nowIso = new Date().toISOString();
    if (type === 'morning') {
      user.lastMorningReminderSentAt = nowIso;
    } else {
      user.lastEveningReminderSentAt = nowIso;
    }
    this.saveToDisk();
    this.persistUserToMongo(user);
  }
}
