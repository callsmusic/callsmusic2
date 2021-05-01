const { TGCalls, Stream } = require("tgcalls");
const queues = require("../queues");

module.exports.Connection = class {
  chatId;
  playing;
  stream;
  tgcalls;

  constructor(chatId) {
    this.chatId = chatId;
    this.playing = false;
    this.tgcalls = new TGCalls();
  }

  end() {
    this.playing = false;
    let get = queues.get(this.chatId);
    if (get.readable) this.setReadable(get.readable);
  }

  async joinCall(readable) {
    this.stream = new Stream(readable, 16, 48000, 1);
    this.stream.on("finish", () => {
      this.end();
    });
    await this.tgcalls.start(this.stream.createTrack());
    this.playing = true;
  }

  async setReadable(readable) {
    this.stream.setReadable(readable);
    this.playing = true;
  }

  pause() {
    if (!this.stream.paused) {
      this.stream.pause();
      return true;
    } else return false;
  }

  resume() {
    if (this.stream.paused) {
      this.stream.pause();
      return true;
    } else return false;
  }

  stop() {
    if (!this.stream.finished) {
      this.stream.finish();
      this.end();
      return true;
    } else return false;
  }
};
