  
const { Composer } = require("telegraf")
const queues = require("../../queues");

module.exports = Composer.command("playlist", async (ctx) =>{
    if (ctx.chat.type != "supergroup") {
        await ctx.reply("This command is only for group!");
    }
    let queue = "";
    queues.getAll(ctx.chat.id).forEach(el => {
         queue += `Title - ${el.title}\n\n`;
    });
    await ctx.reply(`<b>Play List:</b>\n-------------------------\n${queue}`, { parse_mode: "HTML" });
});
