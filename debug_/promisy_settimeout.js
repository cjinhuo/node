const util = require('util')


debugger
setInterval(() => {

})
setTimeout(() => {

})
const sleep = util.promisify(setTimeout)
async function main() {
  debugger
  const sleep = util.promisify(setTimeout)
  console.log('start')
  await sleep(1000)
  console.log('1秒过去了')
}

const originalSetTimeout = global.setTimeout
const setTimeoutMap = new Map()
const timeoutRegistry = new FinalizationRegistry((id) => {
  setTimeoutMap.delete(id)
})

let id = 0
setTimeout = (...args) => {
  const timer = originalSetTimeout(...args)
  timeoutRegistry.register(timer, ++id)
  setTimeoutMap.set(id, '')
  return timer
};

main()