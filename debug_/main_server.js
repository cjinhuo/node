const net = require('net');
const child_process = require('child_process');

const childProcess_one = child_process.fork('./child_one.js', ['child']);
const childProcess_two = child_process.fork('./child_two.js', ['child']);
const server = net.createServer()
server.listen(9999, () => {
  childProcess_one.send({ hello: 'world' }, server)
  childProcess_two.send({ hello: 'world' }, server)
})
server.on('connection', (socket) => {
  console.log(process.pid, 'parent process connection')
  socket.write('parent write')
  socket.pipe(socket)
})

