const fs = require('fs')
console.log(JSON.stringify)
const origin = JSON.stringify
debugger
origin({
  test: '1'
})
fs.writeFileSync(1, origin({
  test: '1'
}))