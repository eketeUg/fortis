import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import {
  LogWeightDto,
  ProgressStats,
  SyncProgressDto,
  UserProgress,
  WeightEntry,
} from './progress.types';

@Controller('api/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get(':telegramId')
  getProgress(@Param('telegramId') telegramId: string): UserProgress {
    return this.progressService.getUserProgress(telegramId);
  }

  @Get(':telegramId/stats')
  getStats(
    @Param('telegramId') telegramId: string,
    @Query('total') total?: string,
  ): ProgressStats {
    const totalCount = total ? parseInt(total, 10) : 84;
    return this.progressService.getUserStats(telegramId, totalCount);
  }

  @Post('sync')
  syncProgress(@Body() dto: SyncProgressDto): UserProgress {
    return this.progressService.syncProgress(dto);
  }

  @Post('reset-week')
  resetWeek(@Body() body: { telegramId: string }): UserProgress {
    return this.progressService.resetWeek(body.telegramId);
  }

  // Daily Weight Tracking Endpoints
  @Get(':telegramId/weight')
  getWeightHistory(@Param('telegramId') telegramId: string): WeightEntry[] {
    return this.progressService.getWeightHistory(telegramId);
  }

  @Post('weight')
  logWeight(@Body() dto: LogWeightDto): WeightEntry[] {
    return this.progressService.logWeight(dto);
  }

  @Delete(':telegramId/weight/:date')
  deleteWeight(
    @Param('telegramId') telegramId: string,
    @Param('date') date: string,
  ): WeightEntry[] {
    return this.progressService.deleteWeight(telegramId, date);
  }
}
