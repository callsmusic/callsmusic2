class Queues {
  queues;

  constructor() {
    this.queues = {};
  }

  push(chatId, item) {
    if (chatId in this.queues) this.queues[chatId].push(item);
    else this.queues[chatId] = [item];
    return this.queues[chatId].length;
  }

  get(chatId) {
    if (chatId in this.queues)
      if (this.queues[chatId].length !== 0) return this.queues[chatId].pop(0);
    return {};
  }

  getAll(chatId) {
    if (chatId in this.queues) return this.queues[chatId];
    else return [];
  }

  clear(chatId) {
    if (chatId in this.queues) {
      delete this.queues[chatId];
      return true;
    } else return false;
  }
}

module.exports = new Queues();
