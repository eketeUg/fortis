import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ProgressModule } from './progress/progress.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [WorkoutModule, ProgressModule, BotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
