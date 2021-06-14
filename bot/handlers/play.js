const { Composer, InputFile } = require("grammy");
const { escape } = require("html-escaper");
const { createMessageLink, createUserLink, getFile } = require("../utils");
const connections = require("../../connections");
const ffmpeg = require("../../ffmpeg");
const queues = require("../../queues");
const { generatePhoto } = require("../../image");

const composer = new Composer();

async function playOrQueue(ctx) {
    const media =
            ctx.message.reply_to_message.audio ||
            ctx.message.reply_to_message.voice,
        isVoice = !!ctx.message.reply_to_message.voice,
        title = isVoice ? "Voice" : media.title,
        artist = isVoice ? ctx.from.first_name : media.performer,
        photo = new InputFile(await generatePhoto("audio", { title, artist })),
        readable = ffmpeg(await getFile(ctx, media.file_id)),
        link = createMessageLink(
            ctx.message,
            isVoice ? "a voice message" : escape(artist + " - " + title)
        );
    let caption;

    if (connections.playing(ctx.chat.id)) {
        const position = queues.push(ctx.chat.id, {
            title,
            artist,
            readable,
        });
        caption =
            `#\ufe0f\u20e3 ${createUserLink(ctx.from)} ` +
            `queued ${link} at position ${position}`;
    } else {
        caption =
            `\u25b6\ufe0f ${createUserLink(ctx.from)} ` +
            `is now playing ${link}`;
    }

    await ctx.replyWithPhoto(photo, { caption });
}

composer.command("play", playOrQueue);
module.exports = composer;
