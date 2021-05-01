const { Composer } = require("telegraf");
const { leaveCall } = require("../../userbot/calls");
const connections = require("../../connections");
const queues = require("../../queues");

module.exports = Composer.command("stop", async (ctx) => {
  if (connections.inCall(ctx.chat.id)) {
    connections.stop(ctx.chat.id);
    await leaveCall(ctx.chat.id);
    connections.remove(ctx.chat.id);
    queues.clear(ctx.chat.id);
    await ctx.reply("Stopped!");
  } else {
    await ctx.reply("Not in call!");
  }
});
