const { AsyncLocalStorage } = require('node:async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();
const fs = require('fs')

const getStoreId = () => asyncLocalStorage.getStore()?.id

asyncLocalStorage.run({ id: 1 }, () => {
  // 用 run 新建异步上下文并把 { id: 1 } 赋值到当前 store
  fs.writeSync(1, `run store.id: ${getStoreId()} \n`)
  setTimeout(() => {
    // 虽然 setTimeout 会延迟执行回调，但依然在 asyncLocalStorage.run 创建的 Async Scope 中
    fs.writeSync(1, `run>setTimeout store.id: ${getStoreId()} \n`)
  }, 200);
  asyncLocalStorage.run({ id: 2 }, () => {
    // 重新创建异步上下文并把 { id: 2 } 覆写至当前 store
    fs.writeSync(1, `run>setTimeout>store_2.run store.id: ${getStoreId()} \n`)
  })
});
fs.writeSync(1, `main store.id: ${getStoreId()} \n`) // undefined
// $ 运行结果:
// run store.id: 1 
// run>setTimeout>store_2.run store.id: 2 
// main store.id: undefined 
// run>setTimeout store.id: 1