const config = require("../config");

module.exports.link = (msg) => {
  let chatId = msg.chat.id.toString();
  if (chatId.startsWith("-100")) chatId = chatId.slice(3, chatId.length);
  return `https://t.me/c/${chatId}/${msg.reply_to_message.message_id}`;
};

module.exports.getFile = async (ctx, fileId) => {
  return `https://api.telegram.org/file/bot${config.botToken}/${
    (await ctx.api.getFile(fileId)).file_path
  }`;
};
