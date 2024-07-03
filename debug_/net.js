const net = require('net')
debugger
const socket = net.connect(9229, '127.0.0.1')
socket.on('connect', () => {
  debugger
  console.log('connect success')
})
socket.on('error', err => {
  console.log('error .....', err)
})