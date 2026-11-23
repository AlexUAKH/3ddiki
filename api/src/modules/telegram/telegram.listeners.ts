import { Bot } from 'grammy';

export const setListeners = (bot: Bot) => {
  bot.on('message:text', async (ctx) => {
    await ctx.reply(
      'Thanks for your message. This bot is not configured for that yet.',
    );
  });
};
