
var fs = require('fs')
var https = require('https')
var parser = require('csv-parse')
var toArray = require('stream-to-array')

var URL = 'https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv'

https.get(URL, function onResponse (res) {
  toArray(res.pipe(parser()), function (err, codes) {
    if (err) throw err
    var fd = fs.openSync('src/iana.json', 'w')

    fs.writeSync(fd, '[\n')

    codes.forEach(function (code) {
      fs.writeSync(fd, '  ' + JSON.stringify(code) + endLine.apply(this, arguments))
    })

    fs.writeSync(fd, ']\n')

    fs.closeSync(fd)
  })
})

function endLine (val, index, array) {
  var comma = index + 1 === array.length
    ? ''
    : ','
  return comma + '\n'
}
