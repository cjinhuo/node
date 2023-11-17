const async_hooks = require('node:async_hooks');

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    console.log(asyncId)
   },
   
  destroy(asyncId) { },
});