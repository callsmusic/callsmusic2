const { Composer, InputFile } = require("grammy");
const { escape } = require("html-escaper");
const ffmpeg = require("../../ffmpeg");
const connections = require("../../connections");
const queues = require("../../queues");
const { createImage } = require("../../image");
const { link, getFile } = require("../helpers");

const composer = new Composer();

composer.command("play", async (ctx) => {
  const file =
      ctx.message.reply_to_message.audio || ctx.message.reply_to_message.voice,
    fileIsVoice = typeof ctx.message.reply_to_message.voice !== "undefined",
    input = await getFile(ctx, file.file_id),
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

    await ctx.replyWithPhoto(new InputFile(image), {
      caption: `#️⃣ <b><a href="tg://user?id=${ctx.from.id}">${escape(
        ctx.from.first_name
      )}</> queued <a href="${link(ctx.message)}">${
        fileIsVoice ? "a voice message" : escape(text2 + " - " + text1)
      }</> at position ${position}...</>`,
    });
  } else {
    await connections.setReadable(ctx.chat.id, readable);

    await ctx.replyWithPhoto(new InputFile(image), {
      caption: `▶️ <b><a href="tg://user?id${ctx.from.id}">${escape(
        ctx.from.first_name
      )}</> is now playing <a href="${link(ctx.message)}">${
        fileIsVoice ? "a voice message" : escape(text2) + " - " + escape(text1)
      }</></>...`,
    });
  }
});

module.exports = composer;
