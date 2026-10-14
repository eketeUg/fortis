import { Module } from '@nestjs/common';
import { ProgressModule } from '../progress/progress.module';
import { WorkoutModule } from '../workout/workout.module';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
  imports: [WorkoutModule, ProgressModule],
  controllers: [BotController],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
