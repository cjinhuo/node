const { AsyncLocalStorage, executionAsyncId } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

// mock request
async function request(res, timeout) {
  return new Promise((resolve) => {
    console.log('executionAsyncId', executionAsyncId());
    setTimeout(() => {
      console.log('executionAsyncId', executionAsyncId());
      debugger;
      resolve(res);
    }, timeout);
  });
}

let obj = {};
function update({ data, type }) {
  // 此处是通过 getStore 来获取 id，而不是通过透传参数
  const id = asyncLocalStorage.getStore().get('id');
  if (!obj[id]) {
    obj[id] = {};
  }
  obj[id][type] = data;
  console.log(obj);
}

function fnCallback() {
  const { id } = asyncLocalStorage.getStore();
  console.log('fnCallback id:', id);
}

function hookedRequest(id, res, timeout) {
  asyncLocalStorage.run(new Map(), () => {
    // 此处没有直接传入 id 作为唯一标识符
    console.log('asyncLocalStorage run');
    asyncLocalStorage.getStore().set('id', id);
    update({
      data: {
        id,
      },
      type: 'send',
    });

    // const obj = asyncLocalStorage.getStore();
    // asyncLocalStorage.enterWith({ id: id + 10 });
    request(res, timeout).then((res) => {
      // 这里的 update 和上面的 update 下的 asyncLocalStorage.getStore() 都返回同一个 id
      update({ data: res, type: 'end' });
    });
    return fnCallback();
  });
  const store = asyncLocalStorage.getStore();
  console.log('out of asyncLocalStorage.run, get store:', store);
}

async function main() {
  hookedRequest(1, { data: 'a.com' }, 1000);

  hookedRequest(2, { data: 'b.com' }, 600);
}

main();
