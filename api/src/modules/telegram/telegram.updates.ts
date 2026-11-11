import { Injectable } from '@nestjs/common';
import { Bot } from 'grammy';

@Injectable()
export class TelegramUpdates {
  register(bot: Bot): void {
    bot.command('start', async (ctx) => {
      await ctx.reply(
        'Hello! The 3ddiki bot is ready. Send /help to see commands.',
      );
    });

    bot.command('help', async (ctx) => {
      await ctx.reply(
        'Available commands:\n/start - start the bot\n/help - show this message',
      );
    });

    bot.on('message:text', async (ctx) => {
      await ctx.reply(
        'Thanks for your message. This bot is not configured for that yet.',
      );
    });
  }
}
