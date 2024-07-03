const fs = require('fs')
async function main() {
  debugger
  // fs.writeFile('hello.txt', 'Hello World!', (err) => {

  // })
  const promise = fs.promises.writeFile('hello.txt', 'Hello World!')
  await promise
}
main()