'use strict'
debugger
const { executionAsyncId } = require('node:async_hooks')
const fs = require('fs')

const sleep = async () => {
  await new Promise(resolve => setTimeout((() => {
    fs.writeSync(1, `promise async id: ${executionAsyncId()} \n`)

    resolve()
  }), 1000))
}
fs.writeSync(1, `main async id: ${executionAsyncId()} \n`)
setTimeout(async () => {
  fs.writeSync(1, `setTimeout async id: ${executionAsyncId()} \n`)
  await sleep(1000)
  fs.writeSync(1, `setTimeout async id: ${executionAsyncId()} \n`)
}, 100);
fs.writeSync(1, `setTimeout async id: ${executionAsyncId()} \n`)