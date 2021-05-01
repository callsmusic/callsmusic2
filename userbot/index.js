const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Logger } = require("telegram/extensions");
const input = require("input");
const config = require("../config");

const stringSession = new StringSession(config.stringSession || "");
const client = new TelegramClient(stringSession, config.apiId, config.apiHash, {
  connectionRetries: 5,
});

Logger.setLevel("none");

module.exports.client = client;
module.exports.start = async () => {
  await client.start({
    phoneNumber: async () => await input.text("Number"),
    password: async () => await input.text("Password"),
    phoneCode: async () => await input.text("Code"),
    onError: (err) => console.log(err),
  });

  if (!config.stringSession)
    console.log(`STRING_SESSION=${client.session.save()}`);
};
