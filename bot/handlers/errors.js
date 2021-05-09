const { Composer } = require("telegraf");

module.exports = Composer.catch(async (err, ctx) => {
  if (err instanceof Error) {
    await ctx.reply(err.toString());
  }
});
