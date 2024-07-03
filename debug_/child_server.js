

const net = require('net');
const child_process = require('child_process');

if (process.argv[2] !== 'child') {
  const childProcess = child_process.fork(__filename, ['child']);
  const server = net.createServer()
  server.listen(9999, () => {
    childProcess.send({ hello: 'world' }, server)
  })
  server.on('connection', (socket) => {
    console.log(process.pid, 'parent process connection')
    socket.write('parent write')
    socket.pipe(socket)
  })
} else {
  process.on('message', (msg, handle) => {
    console.log('child process get msg', msg)
    handle.on('connection', (socket) => {
      console.log(process.pid, 'child process connection')
      socket.write('child write')
      socket.pipe(socket)
    })
    // console.log(handle.allowHalfOpen)
  });
}