const config = require("../config");

const createLink = (url, text) => `<a href="${url}">${escape(text)}</a>`;

function escape(s, quote = true) {
    s = s.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");

    if (quote) {
        s = s.replace(/"/g, "&quot;");
        s = s.replace(/'/g, "&#x27;");
    }

    return s;
}

function createUserLink(user) {
    return createLink(`tg://user?id=${user.id}`, user.first_name);
}

function createMessageLink(message, text) {
    return createLink(
        "https://t.me/c/" +
            (message.chat.id.toString().startsWith("-100")
                ? message.chat.id
                      .toString()
                      .slice(3, message.chat.id.toString().length)
                : message.chat.id) +
            `/${message.message_id}`,
        text
    );
}

const getFile = async (ctx, fileId) =>
    "https://api.telegram.org/file/bot" +
    `${config.botToken}/${(await ctx.api.getFile(fileId)).file_path}`;

module.exports = { createLink, createUserLink, createMessageLink, getFile };
