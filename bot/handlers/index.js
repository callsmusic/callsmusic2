const play = require("./play");
const controls = require("./controls");
const voiceChatEnded = require("./voice_chat_ended");
const privateChat = require("./private");

module.exports = (bot) => {
    bot.filter((ctx) => {
        if (ctx.chat?.type === "supergroup") {
            if (
                ctx.message?.reply_to_message &&
                (ctx.message?.reply_to_message?.audio ||
                    ctx.message?.reply_to_message?.voice)
            ) {
                return true;
            }
        }
        return false;
    }).use(play);
    bot.filter((ctx) => ctx.chat?.type === "supergroup", controls);
    bot.filter((ctx) => ctx.chat?.type === "private", privateChat);
    bot.use(voiceChatEnded);
};
