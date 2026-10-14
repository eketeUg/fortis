import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import {
  LogWeightDto,
  ProgressStats,
  SyncProgressDto,
  UserProgress,
  WeightEntry,
} from './progress.types';

@Injectable()
export class ProgressService {
  private readonly logger = new Logger(ProgressService.name);
  private readonly storagePath = path.resolve(
    process.cwd(),
    '.data',
    'progress.json',
  );
  private userStore: Map<string, UserProgress> = new Map();

  constructor() {
    this.ensureStorage();
    this.loadFromDisk();
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
          this.userStore.set(key, user);
        }
        this.logger.log(
          `Loaded progress data for ${this.userStore.size} users.`,
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
        updatedAt: new Date().toISOString(),
      };
      this.userStore.set(id, user);
      this.saveToDisk();
    }

    if (!user.weightHistory) {
      user.weightHistory = [];
    }

    // Reset weekly items if we entered a new week
    if (user.currentWeek !== currentWeek) {
      user.currentWeek = currentWeek;
      user.updatedAt = new Date().toISOString();
      this.saveToDisk();
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

    return user;
  }

  // Daily Weight Tracking (in kg)
  logWeight(dto: LogWeightDto): WeightEntry[] {
    const user = this.getUserProgress(dto.telegramId);
    const date = dto.date || this.getTodayDateString();
    const roundedWeight = Math.round(dto.weight * 10) / 10;

    // Check if entry for date already exists, update or push
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

    // Sort by date ascending
    user.weightHistory.sort((a, b) => a.date.localeCompare(b.date));
    user.updatedAt = new Date().toISOString();

    this.saveToDisk();
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
    };
  }

  getAllUsersWithChat(): UserProgress[] {
    return Array.from(this.userStore.values()).filter(
      (u) => u.chatId !== undefined,
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
  }
}
