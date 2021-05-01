require("dotenv").config();

module.exports = {
  apiId: parseInt(process.env.API_ID),
  apiHash: process.env.API_HASH,
  stringSession: process.env.STRING_SESSION,
  botToken: process.env.BOT_TOKEN,
};
