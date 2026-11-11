import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bot } from 'grammy';
import { TelegramUpdates } from './telegram.updates';

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TelegramService.name);
  private bot?: Bot;

  constructor(
    private readonly configService: ConfigService,
    private readonly telegramUpdates: TelegramUpdates,
  ) {}

  onModuleInit(): void {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN')?.trim();
    if (!token) {
      this.logger.warn(
        'Telegram bot is disabled: TELEGRAM_BOT_TOKEN is not set',
      );
      return;
    }

    const bot = new Bot(token);
    this.telegramUpdates.register(bot);
    bot.catch((error) => {
      this.logger.error(`Telegram update handler failed: ${error.message}`);
    });

    this.bot = bot;
    void bot
      .start({
        onStart: (botInfo) => {
          this.logger.log(`Telegram bot @${botInfo.username} started`);
        },
      })
      .catch((error: unknown) => {
        this.logger.error(
          'Telegram long polling failed',
          error instanceof Error ? error.stack : String(error),
        );
        this.bot = undefined;
      });
  }

  onModuleDestroy(): void {
    void this.bot?.stop();
    this.bot = undefined;
  }
}
