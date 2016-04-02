
var fs = require('fs')
var http = require('http')
var parser = require('csv-parse')
var toArray = require('stream-to-array')

var URL = 'http://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv'

http.get(URL, function onResponse(res) {
  toArray(res.pipe(parser()), function (err, codes) {
    if (err) throw err
    fs.writeFile('src/iana.json', JSON.stringify(codes))
  })
})
