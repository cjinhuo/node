const { nextTick } = require('node:process');



nextTick(() => {
  setTimeout(() => {
    nextTick(() => {
      console.log('1')
    })
  })
})

queueMicrotask(() => {
  console.log(1)
})