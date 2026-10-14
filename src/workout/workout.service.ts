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
    const days: Array<'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'> = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];
    const todayIndex = new Date().getDay();
    const dayKey = days[todayIndex];
    return WEEKLY_SCHEDULE[dayKey];
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
}
