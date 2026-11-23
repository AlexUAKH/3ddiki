import { Injectable } from '@nestjs/common';
import { Bot } from 'grammy';
import { setCommands } from './telegram.commands';
import { setListeners } from './telegram.listeners';

@Injectable()
export class TelegramUpdates {
  register(bot: Bot): void {
    setCommands(bot);
    // bot.command('start', async (ctx) => {
    //   await ctx.reply(
    //     'Hello! The 3ddiki bot is ready. Send /help to see commands.',
    //   );
    // });

    // bot.command('help', async (ctx) => {
    //   await ctx.reply(
    //     'Available commands:\n/start - start the bot\n/help - show this message',
    //   );
    // });

    //   await ctx.reply(
    //     'Thanks for your message. This bot is not configured for that yet.',
    //   );
    // });
    setListeners(bot);
  }
}
