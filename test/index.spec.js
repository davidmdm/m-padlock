'use strict';

const { assert } = require('chai');
const Mutex = require('../index');

describe('Test mutex', () => {
  it('should prevent insertions from being in the wrong order - with mutex', async () => {
    const results = [];
    const mutex = new Mutex();
    const insert = (value, time) => {
      return new Promise(resolve =>
        setTimeout(() => {
          results.push(value);
          resolve();
        }, time)
      );
    };

    const doInsert = async (value, time) => {
      const unlock = await mutex.lock();
      await insert(value, time);
      unlock();
    };

    doInsert(1, 250);
    doInsert(2, 120);
    doInsert(3, 60);

    await new Promise(resolve => {
      setTimeout(() => {
        assert.deepEqual(results, [1, 2, 3]);
        resolve();
      }, 500);
    });
  });

  it('should insert in inverse order - without mutex', async () => {
    const results = [];
    const mutex = new Mutex();
    const insert = (value, time) => {
      return new Promise(resolve =>
        setTimeout(() => {
          results.push(value);
          resolve();
        }, time)
      );
    };

    const doInsert = async (value, time) => {
      await insert(value, time);
    };

    doInsert(1, 250);
    doInsert(2, 120);
    doInsert(3, 60);

    await new Promise(resolve => {
      setTimeout(() => {
        assert.deepEqual(results, [3, 2, 1]);
        resolve();
      }, 500);
    });
  });
});
