const { executionAsyncId } = require('async_hooks');
const net = require('net');
const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks');
let asyncLocalStorage = new AsyncLocalStorage();
function initServer() {
  let count = 0;
  const server = net.createServer(function (connection) {
    console.log('server been connected');
    connection.on('end', function () {
      console.log('客户端关闭连接');
    });
    connection.write(`hello world!${count++}\r\n`);
    connection.pipe(connection);
  });
  debugger;
  server.listen(9999, () => {
    debugger;
    console.log(
      'asyncLocalStorage',
      executionAsyncId(),
      asyncLocalStorage.getStore()
    );
    console.log('server is listening on 9999');
  });
}

const asyncResource = new AsyncResource('test');
const asyncResource_2 = new AsyncResource('test');
function initClient() {
  let client = null;
  asyncResource.runInAsyncScope(() => {
    asyncLocalStorage.enterWith({ first: 1 });
    console.log('enter with');
    setTimeout(() => {
      Object.assign(asyncLocalStorage.getStore(), { set_1: 1 });
      console.log('set 1', asyncLocalStorage.getStore());
    }, 1000);
    setTimeout(() => {
      Object.assign(asyncLocalStorage.getStore(), { set_2: 1 });
      console.log('set 2', asyncLocalStorage.getStore());
    }, 2000);

    // client = net.connect({ port: 8080 }, () => {
    //   console.log('client connected', executionAsyncId());
    //   Object.assign(asyncLocalStorage.getStore(), { connect: 1 });
    // });

    // client.on('end', () => {
    //   console.log('client on end', executionAsyncId());
    //   console.log('断开与服务器的连接');
    // });
    // client.on('data', (data) => {
    //   console.log('client on data', executionAsyncId());
    //   Object.assign(asyncLocalStorage.getStore(), { data: 1 });
    //   console.log(asyncLocalStorage.getStore());
    // });
    const asyncResource_2 = new AsyncResource('test');
    console.log('asyncResource_2', asyncResource_2);
    asyncResource_2.runInAsyncScope(() => {
      console.log('内嵌 asyncResource_2', asyncLocalStorage.getStore());
    });
  });

  // setTimeout(() => {
  //   asyncResource_2.runInAsyncScope(() => {
  //     console.log('asyncResource_2', asyncLocalStorage.getStore());
  //   });
  // }, 1000);
  asyncResource.runInAsyncScope(() => {
    console.log('独立 asyncResource', asyncLocalStorage.getStore());
    initServer();
  });
  console.log('外层', asyncLocalStorage.getStore());
  asyncResource_2.runInAsyncScope(() => {
    asyncLocalStorage.enterWith({ second: 2 });
  });
  asyncResource_2.runInAsyncScope(() => {
    debugger;
    console.log('asyncResource_2', asyncLocalStorage.getStore());
  });
}

// initServer();
initClient();
