export interface WeightEntry {
  date: string; // "YYYY-MM-DD"
  weight: number; // in kg (e.g. 78.4)
  timestamp: string;
}

export interface UserProgress {
  telegramId: string;
  chatId?: number;
  username?: string;
  firstName?: string;
  currentWeek: string;
  completedItems: Record<string, boolean>; // key format: "YYYY-MM-DD|Day|am|index"
  weightHistory: WeightEntry[];
  streak: number;
  lastActiveDate: string;
  completedDays: string[];
  totalWorkoutsCompleted: number;
  notificationsEnabled: boolean; // Opt-in / Opt-out
  lastMorningReminderSentAt?: string;
  lastEveningReminderSentAt?: string;
  updatedAt: string;
}

export interface SyncProgressDto {
  telegramId: string;
  chatId?: number;
  username?: string;
  firstName?: string;
  initData?: string;
  weekKey?: string;
  completedItems: Record<string, boolean>;
  markActive?: boolean;
  notificationsEnabled?: boolean;
}

export interface LogWeightDto {
  telegramId: string;
  date?: string; // defaults to today YYYY-MM-DD
  weight: number;
}

export interface ToggleNotificationDto {
  telegramId: string;
  enabled: boolean;
}

export interface ProgressStats {
  weekKey: string;
  totalItems: number;
  completedCount: number;
  completionPercentage: number;
  streak: number;
  daysCompletedThisWeek: number;
  latestWeight?: number;
  weightStart?: number;
  weightChange?: number;
  notificationsEnabled: boolean;
}
