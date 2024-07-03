const net = require('net')


function initServer() {
  let count = 0
  const server = net.createServer(function (connection) {
    console.log('server been connected')
    connection.on('end', function () {
      console.log('客户端关闭连接')
    })
    connection.write(`hello world!${count++}\r\n`)
    connection.pipe(connection)
  })

  server.listen(9006, () => {
    console.log('server is listening on 9006')
  })
}

initServer()