# m-padlock

Create a Promise based mutex

### Installing

```
npm install m-padlock --save
```

## Examples

Use cases for mutexes are slim in nodejs, given the single threaded async nature.
Very rarely there are cases such as concurrent transactions that would be preferable to
run one at a time.

```javascript
const Mutex = require('m-padlock');
const mutex = new Mutex();


// Using async/await (Node v8+)
const unlock = await mutex.lock();
await postgres.transaction(trx => {
  // do work
});
unlock();

// Using promises
mutex.lock()
  .then(unlock => {
    return postgres.transaction(trx => {
      // do work
    })
    .then(() => unlock());
  });
```

## Tests

From the m-padlock root directory run:

```
npm install
npm run test
```

This will generate a coverage report inside the root directory in a new directory called coverage

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
