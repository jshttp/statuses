
var fs = require('fs')
var https = require('https')
var parser = require('csv-parse')
var toArray = require('stream-to-array')

var URL = 'https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv'

https.get(URL, function onResponse (res) {
  toArray(res.pipe(parser()), function (err, codes) {
    if (err) throw err
    fs.writeFile('src/iana.json', JSON.stringify(codes))
  })
})
