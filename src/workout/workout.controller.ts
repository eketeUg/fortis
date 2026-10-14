import { Controller, Get, Param } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { DayPlan, Exercise } from './workout.types';

@Controller('api/workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get('schedule')
  getSchedule(): Record<string, DayPlan> {
    return this.workoutService.getWeeklySchedule();
  }

  @Get('today')
  getToday(): DayPlan {
    return this.workoutService.getTodayPlan();
  }

  @Get('day/:day')
  getDay(@Param('day') day: string): DayPlan {
    return this.workoutService.getDayPlan(day);
  }

  @Get('exercises')
  getExercises(): Exercise[] {
    return this.workoutService.getAllExercises();
  }

  @Get('exercise/:id')
  getExercise(@Param('id') id: string): Exercise {
    return this.workoutService.getExercise(id);
  }
}
