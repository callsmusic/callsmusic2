const { Composer } = require("telegraf");

module.exports = Composer.catch(async (err, ctx) => {
  await ctx.reply(err.toString());
});
