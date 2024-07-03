const fs = require('fs')

function hookDirClose() {
  const original = fs.Dir.prototype.close
  fs.Dir.prototype.close = function () {
    console.log('start')
    const result = original.apply(this, arguments)
    if (result && typeof result.then === 'functioin') {
      return result.then(
        (value) => {
          console.log('finish')
          // fsPromises.open return fileHandle which is being wrapped
          return value;
        },
        (error) => {
          throw error;
        }
      );
    }
    return result;
  }
}
function promiseOpen() {
  return new Promise((resolve, reject) => {
    fs.opendir('./', { encoding: 'utf8' }, (err, dir) => {
      if (!err) {
        dir.close().then(() => {
          resolve('')
        })
      } else {
        reject(err);
      }
    });
  })
}

function promiseOpen_1() {
  fs.opendir('./', { encoding: 'utf8' }, (err, dir) => {
    if (!err) {
      dir.read().then(() => {
        console.log('promiseOpen_1: read callback')
        debugger
        dir.close(() => {

        })
      })
    }
  });
}

function promiseOpen_2() {
  fs.opendir('./', { encoding: 'utf8' }, (err, dir) => {
    if (!err) {
      dir.read(() => {
        console.log('promiseOpen_2: read callback')
        debugger
        // 执行两次
        dir.close(() => {

        })
      })
    }
  });
}

function promiseOpen_3() {
  fs.opendir('./', { encoding: 'utf8' }, (err, dir) => {
    if (!err) {
      dir.read(() => {
        console.log('promiseOpen_2: read callback')
        debugger
        // 执行三次
        dir.close().then(() => {

        })
      })
    }
  });
}
// hookDirClose()
// promiseOpen_1()
// promiseOpen_2()
promiseOpen_3()
// setTimeout(() => {
//   promiseOpen()
// }, 2000)