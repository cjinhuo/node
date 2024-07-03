const http = require('http')

debugger
http.get('http://lkqtjze7.fn.bytedance.net/get_publishing_table', res => {
  let buf = Buffer.from('')
  res.on('data', chunk => {
    debugger
    console.log('http on data', chunk)
    fs.writeFile('./http_write.txt', chunk, 'utf8', function () {
      console.log('write success')
    })
    buf = Buffer.concat([buf, chunk])
  })
  res.on('end', () => {
    try {
      console.log('http on end')
      // console.log(JSON.parse(buf.toString()))
    } catch (e) {
      console.error(e.message)
    }
  })
})