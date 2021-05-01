const { Composer } = require("telegraf");

module.exports = Composer.command("start", async (ctx) => {
  await ctx.reply("Hello!");
});
