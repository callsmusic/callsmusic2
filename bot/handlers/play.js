const { Composer } = require("telegraf");
const ffmpeg = require("../../ffmpeg");
const connections = require("../../connections");
const queues = require("../../queues");
const { createImage } = require("../../image");
const { esc, link } = require("../helpers");

module.exports = Composer.command("play", async (ctx) => {
  if (ctx.chat.type != "supergroup") {
    await ctx.reply("This command is for groups!");
  } else if (
    ctx.message.reply_to_message &&
    (ctx.message.reply_to_message.audio || ctx.message.reply_to_message.voice)
  ) {
    const file =
        ctx.message.reply_to_message.audio ||
        ctx.message.reply_to_message.voice,
      fileIsVoice = typeof ctx.message.reply_to_message.voice !== "undefined",
      input = (await ctx.telegram.getFileLink(file.file_id)).href,
      text1 = fileIsVoice ? "Voice" : file.title,
      text2 = fileIsVoice ? ctx.from.first_name : file.performer,
      image = await createImage("audio", { text1: text1, text2: text2 });
    const readable = ffmpeg(input);
    if (connections.playing(ctx.chat.id)) {
      const position = queues.push(ctx.chat.id, {
        title: text1,
        artist: text2,
        readable: readable,
      });
      await ctx.replyWithPhoto(
        { source: image },
        {
          caption: `<b><a href="tg://user?id=${ctx.from.id}">${esc(
            ctx.from.first_name
          )}</> queued <a href="${link(ctx.message)}">${
            fileIsVoice ? "a voice message" : esc(text2 + " - " + text1)
          }</> at position ${position}...</>`,
          parse_mode: "html",
        }
      );
    } else {
      await connections.setReadable(ctx.chat.id, readable);
      await ctx.replyWithPhoto(
        { source: image },
        {
          caption: `<b><a href="tg://user?id${ctx.from.id}">${esc(
            ctx.from.first_name
          )}</> is now playing <a href="${link(ctx.message)}">${
            fileIsVoice ? "a voice message" : esc(text2) + " - " + esc(text1)
          }</></>...`,
          parse_mode: "html",
        }
      );
    }
  } else {
    await ctx.reply("Reply to an audio file or voice message!");
  }
});
