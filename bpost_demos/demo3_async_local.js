const { AsyncLocalStorage } = require('node:async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();
const fs = require('fs')

const getStoreId = () => asyncLocalStorage.getStore()?.id
const callback = () => {
  fs.writeSync(1, `run>setTimeout store.id: ${getStoreId()} \n`)
}
asyncLocalStorage.run({ id: 1 }, () => {
  fs.writeSync(1, `run store.id: ${getStoreId()} \n`)
  setTimeout(callback);
});
// $ 运行结果:
// run store.id: 1 
// run>setTimeout store.id: 1