const { AsyncLocalStorage, executionAsyncId } = require('node:async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();
const store = { id: 2 };
const fn = () => {
  console.log(asyncLocalStorage.getStore());
};
asyncLocalStorage.run(store, () => {
  // 在执行同步函数的时候就把 setTimeout 的 async_id 分配到
  setTimeout(() => {
    console.log(executionAsyncId(), asyncLocalStorage.getStore()); // Returns the store object
    fn();
    setTimeout(() => {
      fn();
  }, 200);
  }, 200);

});

