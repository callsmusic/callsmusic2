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
      const connection = new Connection(chatId, () => this.remove(chatId));
      await connection.joinCall(readable);
      this.connections[chatId] = connection;
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

  async stop(chatId) {
    if (this.inCall(chatId)) {
      if (await this.connections[chatId].stop()) {
        this.remove(chatId);
        return 0;
      } else return 1;
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
