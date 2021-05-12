const play = require("./play");
const controls = require("./controls");
const voice_chat_ended = require("./voice_chat_ended");
const private = require("./private");

module.exports = (bot) => {
  bot
    .filter((ctx) => {
      if (ctx.chat && ctx.chat.type == "supergroup") {
        if (
          ctx.message &&
          ctx.message.reply_to_message &&
          (ctx.message.reply_to_message.audio ||
            ctx.message.reply_to_message.voice)
        ) {
          return true;
        }
      }
      return false;
    })
    .use(play);
  bot.filter((ctx) => ctx.chat?.type == "supergroup", controls);
  bot.filter((ctx) => ctx.chat?.type == "private", private);
  bot.use(voice_chat_ended);
};
