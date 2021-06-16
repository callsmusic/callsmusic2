const { Composer } = require("grammy");
const connections = require("../../connections");
const queues = require("../../queues");

const composer = new Composer();

composer.on("message:voice_chat_ended", async (ctx) => {
    connections.remove(ctx.chat.id);
    queues.clear(ctx.chat.id);
});

module.exports = composer;
