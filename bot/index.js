const { Bot } = require("grammy");
const config = require("../config");

const bot = new Bot(config.botToken);
require("./handlers")(bot);

bot.api.config.use((prev, method, payload) => {
  return prev(method, {
    ...payload,
    parse_mode: "HTML",
  });
});

bot.catch(async (error) => {
  if (error.error instanceof Error) {
    await error.ctx.reply(error.error.toString());
  }
});

module.exports.bot = bot;
module.exports.start = async () => {
  await bot.start({ dropPendingUpdates: true });
};
