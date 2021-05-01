const { Composer } = require("telegraf");
const connections = require("../../connections");

module.exports = Composer.command("resume", async (ctx) => {
  if (ctx.chat.type != "supergroup") {
    await ctx.reply("This command is for groups!");
    return;
  }
  const result = connections.resume(ctx.chat.id);
  if (result == 0) await ctx.reply("Resumed.");
  else if (result == 1) await ctx.reply("Not paused!");
  else if (result == 2) await ctx.reply("Not in call!");
});
