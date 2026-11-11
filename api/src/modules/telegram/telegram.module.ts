import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { TelegramUpdates } from './telegram.updates';

@Module({
  imports: [ConfigModule],
  providers: [TelegramService, TelegramUpdates],
  exports: [TelegramService],
})
export class TelegramModule {}
