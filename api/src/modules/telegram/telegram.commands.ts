import { Bot } from 'grammy';

export const setCommands = (bot: Bot) => {
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
};
