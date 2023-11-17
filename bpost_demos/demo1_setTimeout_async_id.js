'use strict'
debugger
const { executionAsyncId } = require('node:async_hooks')
const fs = require('fs')

fs.writeSync(1, `main async id: ${executionAsyncId()} \n`)
setTimeout(() => {
  fs.writeSync(1, `setTimeout async id: ${executionAsyncId()} \n`)
  setImmediate(() => {
    fs.writeSync(1, `setTimeout>setImmediate async id: ${executionAsyncId()} \n`)
  }, 100);
  setTimeout(() => {
    fs.writeSync(1, `setTimeout>setTimeout async id: ${executionAsyncId()} \n`)
  }, 100);
}, 100);
// $ 运行结果:
// main async id: 1 
// setTimeout async id: 2
// setTimeout > setImmediate async id: 3
// setTimeout > setTimeout async id: 4 