const { Composer } = require("telegraf");
const connections = require("../../connections");
const queues = require("../../queues");

module.exports = Composer.on("voice_chat_ended", async (ctx) => {
  connections.remove(ctx.chat.id);
  queues.clear(ctx.chat.id);
});
