const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Logger } = require("telegram/extensions");

const config = require("../config");

Logger.setLevel(config.logLevel);

const client = new TelegramClient(
    new StringSession(config.stringSession),
    config.apiId,
    config.apiHash,
    {
        connectionRetries: 5,
    }
);

async function start() {
    await client.start({
        phoneNumber: "",
        password: async () => "",
        phoneCode: async () => "",
        onError: async (_) => false,
    });
}

module.exports = { client, start };
