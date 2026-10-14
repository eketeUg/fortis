import { Document, Model, Schema, model, models } from 'mongoose';

export interface UserProgressDocument extends Document {
  telegramId: string;
  chatId?: number;
  username?: string;
  firstName?: string;
  currentWeek: string;
  completedItems: Map<string, boolean>;
  weightHistory: Array<{
    date: string;
    weight: number;
    timestamp: string;
  }>;
  streak: number;
  lastActiveDate: string;
  completedDays: string[];
  totalWorkoutsCompleted: number;
  notificationsEnabled: boolean;
  lastMorningReminderSentAt?: string;
  lastEveningReminderSentAt?: string;
  lastLaunchUrl?: string;
  lastLaunchedAt?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserProgressSchema = new Schema<UserProgressDocument>(
  {
    telegramId: { type: String, required: true, unique: true, index: true },
    chatId: { type: Number, index: true },
    username: { type: String },
    firstName: { type: String },
    currentWeek: { type: String, required: true },
    completedItems: { type: Map, of: Boolean, default: new Map() },
    weightHistory: [
      {
        date: { type: String, required: true },
        weight: { type: Number, required: true },
        timestamp: { type: String },
      },
    ],
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: String, default: '' },
    completedDays: [{ type: String }],
    totalWorkoutsCompleted: { type: Number, default: 0 },
    notificationsEnabled: { type: Boolean, default: true },
    lastMorningReminderSentAt: { type: String },
    lastEveningReminderSentAt: { type: String },
    lastLaunchUrl: { type: String },
    lastLaunchedAt: { type: String },
  },
  { timestamps: true },
);

export const getUserProgressModel = (): Model<UserProgressDocument> => {
  return (
    (models.UserProgress as Model<UserProgressDocument>) ||
    model<UserProgressDocument>('UserProgress', UserProgressSchema)
  );
};
