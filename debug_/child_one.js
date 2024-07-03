process.on('message', (msg, handle) => {
  console.log('child process get msg', msg)
  handle.on('connection', (socket) => {
    console.log(process.pid, 'child process connection')
    socket.write('child write')
    socket.pipe(socket)
  })
  // console.log(handle.allowHalfOpen)
});