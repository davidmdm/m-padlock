'use strict';

class Mutex {
  constructor() {
    this.unlock = Promise.resolve();
  }

  lock() {
    let key;
    const localUnlock = new Promise(resolve => (key = resolve));
    const previousUnlock = this.unlock;
    this.unlock = previousUnlock.then(() => localUnlock);
    return previousUnlock.then(() => key);
  }
}

module.exports = Mutex;
