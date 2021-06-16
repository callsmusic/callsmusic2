const { Composer } = require("grammy");
const { createMessageLink, createUserLink, getFile } = require("../utils");
const connections = require("../../connections");
const ffmpeg = require("../../ffmpeg");
const queues = require("../../queues");

const composer = new Composer();

async function playOrQueue(ctx) {
    const media =
            ctx.message.reply_to_message.audio ||
            ctx.message.reply_to_message.voice,
        isVoice = !!ctx.message.reply_to_message.voice,
        title = isVoice ? "Voice" : media.title,
        artist = isVoice ? ctx.from.first_name : media.performer,
        readable = ffmpeg(await getFile(ctx, media.file_id)),
        link = createMessageLink(
            ctx.message,
            isVoice ? "a voice message" : artist + " - " + title
        );
    let text;

    if (connections.playing(ctx.chat.id)) {
        const position = queues.push(ctx.chat.id, {
            title,
            artist,
            readable,
        });
        text =
            `<b>#\ufe0f\u20e3 ${createUserLink(ctx.from)} ` +
            `queued ${link} at position ${position}</b>`;
    } else {
        text =
            `<b>\u25b6\ufe0f ${createUserLink(ctx.from)} ` +
            `is now playing ${link}</b>`;
        await connections.setReadable(ctx.chat.id, readable);
    }

    await ctx.reply(text);
}

composer.command("play", playOrQueue);
module.exports = composer;
