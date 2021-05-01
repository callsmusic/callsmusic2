const { joinCall } = require("../userbot/calls");
const { Connection } = require("./connection");

class Connections {
  connections;

  constructor() {
    this.connections = {};
  }

  async setReadable(chatId, readable) {
    if (chatId in this.connections)
      this.connections[chatId].setReadable(readable);
    else {
      this.connections[chatId] = new Connection(chatId);
      this.connections[chatId].tgcalls.joinVoiceCall = async (payload) => {
        return await joinCall(chatId, payload);
      };
      await this.connections[chatId].joinCall(readable);
    }
  }

  inCall(chatId) {
    if (chatId in this.connections) return true;
    else return false;
  }

  playing(chatId) {
    if (this.inCall(chatId)) if (this.connections[chatId].playing) return true;
    return false;
  }

  pause(chatId) {
    if (this.inCall(chatId)) {
      if (this.connections[chatId].pause()) return 0;
      else return 1;
    } else return 2;
  }

  resume(chatId) {
    if (this.inCall(chatId)) {
      if (this.connections[chatId].resume()) return 0;
      else return 1;
    } else return 2;
  }

  stop(chatId) {
    if (this.inCall(chatId)) {
      if (this.connections[chatId].stop()) return 0;
      else return 1;
    } else return 2;
  }

  remove(chatId) {
    if (chatId in this.connections) {
      delete this.connections[chatId];
      return true;
    } else return false;
  }
}

module.exports = new Connections();
