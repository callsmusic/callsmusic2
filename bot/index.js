const { Telegraf } = require("telegraf");
const config = require("../config");

const bot = new Telegraf(config.botToken);
require("./handlers")(bot);

module.exports.bot = bot;
module.exports.start = async () => {
  await bot.launch({ dropPendingUpdates: true });
};
