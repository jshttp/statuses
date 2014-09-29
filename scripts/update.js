
var fs = require('fs')
var request = require('request')
var parser = require('csv-parse')
var toArray = require('stream-to-array')

var URL = 'http://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv'

toArray(request(URL).pipe(parser()), function (err, codes) {
  if (err) throw err
  fs.writeFile('src/iana.json', JSON.stringify(codes))
})
