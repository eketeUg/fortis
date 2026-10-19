import { Injectable, NotFoundException } from '@nestjs/common';
import { EXERCISE_DATABASE, WEEKLY_SCHEDULE } from './workout.data';
import { DayPlan, Exercise } from './workout.types';

@Injectable()
export class WorkoutService {
  getWeeklySchedule(): Record<string, DayPlan> {
    return WEEKLY_SCHEDULE;
  }

  getDayPlan(dayKey: string): DayPlan {
    const capitalized = (
      dayKey.charAt(0).toUpperCase() + dayKey.slice(1).toLowerCase()
    ).slice(0, 3);
    const plan = WEEKLY_SCHEDULE[capitalized];
    if (!plan) {
      throw new NotFoundException(
        `Workout day '${dayKey}' not found. Use Mon, Tue, Wed, Thu, Fri, Sat, Sun.`,
      );
    }
    return plan;
  }

  getTodayPlan(): DayPlan {
    const dayKey = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Lagos',
      weekday: 'short',
    }).format(new Date());
    return WEEKLY_SCHEDULE[dayKey] || WEEKLY_SCHEDULE['Mon'];
  }

  getAllExercises(): Exercise[] {
    return Object.values(EXERCISE_DATABASE);
  }

  getExercise(id: string): Exercise {
    const exercise = EXERCISE_DATABASE[id];
    if (!exercise) {
      throw new NotFoundException(`Exercise '${id}' not found.`);
    }
    return exercise;
  }

  findExerciseByQuery(query: string): Exercise | null {
    if (!query) return null;
    const cleanQuery = query.toLowerCase().trim();
    const q = cleanQuery.replace(/[^a-z0-9]/g, '');
    if (!q) return null;

    // 1. Exact ID
    const exactId = cleanQuery.replace(/\s+/g, '_');
    if (EXERCISE_DATABASE[exactId]) return EXERCISE_DATABASE[exactId];

    // 2. Exact clean ID
    for (const [id, ex] of Object.entries(EXERCISE_DATABASE)) {
      if (id.replace(/[^a-z0-9]/g, '') === q) return ex;
    }

    // 3. Exact clean Name
    for (const ex of Object.values(EXERCISE_DATABASE)) {
      if (ex.name.toLowerCase().replace(/[^a-z0-9]/g, '') === q) return ex;
    }

    // 4. Fuzzy containment
    for (const [id, ex] of Object.entries(EXERCISE_DATABASE)) {
      const cleanName = ex.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanId = id.replace(/[^a-z0-9]/g, '');
      if (
        cleanName.includes(q) ||
        q.includes(cleanName) ||
        cleanId.includes(q) ||
        q.includes(cleanId)
      ) {
        return ex;
      }
    }

    return null;
  }
}
