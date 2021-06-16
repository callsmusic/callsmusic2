const { Composer } = require("grammy");
const connections = require("../../connections");
const queues = require("../../queues");

const composer = new Composer();

composer.command("resume", async (ctx) => {
    const result = connections.resume(ctx.chat.id);
    if (result === 0) await ctx.reply("<b>▶️ Resumed</b>");
    else if (result === 1) await ctx.reply("<b>❌ Not playing</b>");
    else if (result === 2) await ctx.reply("<b>❌ Not in call</b>");
});

composer.command("pause", async (ctx) => {
    const result = connections.pause(ctx.chat.id);
    if (result === 0) await ctx.reply("<b>⏸ Paused</b>");
    else if (result === 1) await ctx.reply("<b>❌ Not playing</b>");
    else if (result === 2) await ctx.reply("<b>❌ Not in call</b>");
});

composer.command("skip", async (ctx) => {
    const result = await connections.stop(ctx.chat.id);
    if (result === 0) await ctx.reply("<b>⏩ Skipped</b>");
    else if (result === 1) await ctx.reply("<b>❌ Not playing</b>");
    else if (result === 2) await ctx.reply("<b>❌ Not in call</b>");
});

composer.command("stop", async (ctx) => {
    if (connections.inCall(ctx.chat.id)) {
        await connections.stop(ctx.chat.id);
        connections.remove(ctx.chat.id);
        queues.clear(ctx.chat.id);
        await ctx.reply("<b>⏹ Stopped</b>");
    } else {
        await ctx.reply("<b>❌ Not in call</b>");
    }
});

module.exports = composer;
