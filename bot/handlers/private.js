const { Composer, InlineKeyboard } = require("grammy");
const { escape } = require("html-escaper");

const composer = new Composer();

composer.command("start", async (ctx) => {
  await ctx.reply(
    `<b>👋🏻 Hi ${escape(ctx.from.first_name)}!</b>

I am Calls Music bot, I let you play music in group calls.

The commands I currently support are:

/play - play the replied audio file or YouTube video
/pause - pause the audio stream
/resume - resume the audio stream
/skip - skip the current audio stream
/stop - clear the queue and remove the userbot from the call`,
    {
      reply_markup: new InlineKeyboard()
        .url("🔈 Channel", "https://t.me/callsmusic")
        .url("Group 💬", "https://t.me/callsmusicchat"),
    }
  );
});

module.exports = composer;
