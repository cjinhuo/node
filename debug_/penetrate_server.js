
const assert = require('assert')
const net = require('net');
const child_process = require('child_process');

if (process.argv[2] !== 'child') {
  const childProcess = child_process.fork(__filename, ['child']);
  const server = net.createServer({
    allowHalfOpen: true
  })
  server.listen(9999, () => {
    childProcess.send(null, server)
  })
} else {
  process.on('message', (msg, handle) => {
    // the handle.allowHalfOpen will be false,indicates that the attribute of the server instance sent from the parent process has been modified
    assert.ok(handle.allowHalfOpen, true) // will throw AssertionError
  });
}

// I send net.Server instance with any options,but finally get a whole new net.Server instance in child process.For example, I create a new net.Server instance with {allowHalfOpen: true},then will get a new net.Server instance with {allowHalfOpen: false} in child process.


