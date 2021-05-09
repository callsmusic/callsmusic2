const { Api } = require("telegram");
const { client } = require(".");
const calls = {};

module.exports.joinCall = async (chatId, params) => {
  if (!(chatId in calls)) {
    const fullChat = (
      await client.invoke(
        new Api.channels.GetFullChannel({
          channel: await client.getEntity(chatId),
        })
      )
    ).fullChat;
    if (!fullChat.call) throw new Error("No voice chat");
    calls[chatId] = fullChat.call;
  }

  return JSON.parse(
    (
      await client.invoke(
        new Api.phone.JoinGroupCall({
          muted: false,
          call: calls[chatId],
          params: new Api.DataJSON({
            data: JSON.stringify({
              ufrag: params.ufrag,
              pwd: params.pwd,
              fingerprints: [
                {
                  hash: params.hash,
                  setup: params.setup,
                  fingerprint: params.fingerprint,
                },
              ],
              ssrc: params.source,
            }),
          }),
        })
      )
    ).updates[0].call.params.data
  );
};

module.exports.leaveCall = async (chatId) => {
  if (chatId in calls) {
    await client.invoke(
      new Api.phone.LeaveGroupCall({ call: calls[chatId], source: 0 })
    );
    return true;
  } else return false;
};
