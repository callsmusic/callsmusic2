module.exports.esc = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

module.exports.link = (msg) => {
  let chatId = msg.chat.id.toString();
  if (chatId.startsWith("-100")) chatId = chatId.slice(3, chatId.length);
  return `https://t.me/c/${chatId}/${msg.reply_to_message.message_id}`;
};
