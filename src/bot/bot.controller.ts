import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegramUpdate } from './bot.types';

@Controller('api/bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(@Body() update: TelegramUpdate) {
    await this.botService.handleUpdate(update);
    return { ok: true };
  }
}
