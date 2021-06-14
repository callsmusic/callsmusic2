const { escape } = require("html-escaper");
const config = require("../config");

const createLink = (url, text) => `<a href="${url}">${escape(text)}</a>`;

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
