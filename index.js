const userbot = require("./userbot");
const bot = require("./bot");

(async () => {
  await userbot.start();
  await bot.start();
})();
