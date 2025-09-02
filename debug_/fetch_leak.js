const http = require('http')

const server = http.createServer();
const port = 9999;
server.on('request', (req, res) => {
  if (req.url === '/test') {
    setTimeout(() => {
      debugger
      res.write('test ok')
      res.end('test2 ok');
    }, 1000)
  }
});

server.listen(port, () => {
  const req = http.request(`http://127.0.0.1:${port}/test`, (res) => {
    res.on('data', (chunk) => {
      console.log(chunk.toString())
    })
    res.on('close', () => {
      console.log('Response closed')
    })
  })

  req.once('socket', socket => {
    console.log('Socket created')

    // 在500毫秒后中止请求
    // setTimeout(() => {
    //   console.log('Aborting request')
    //   req.abort()
    // }, 500)
  })

  req.on('abort', () => {
    console.log('Request aborted')
  })

  req.on('error', (err) => {
    console.error('Request error:', err.message)
  })

  // 一次性不能写入很多数据，需要等待 ondrain 事件，缓冲区满了再写可能会出现 EPIPE
  req.write("{data: 'test'}")

  req.end()
})