'use strict'

var https = require('https')
var parser = require('csv-parse')
var path = require('path')
var toArray = require('stream-to-array')
var write = require('./lib/write')

var URL = 'https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv'
var HEADERS = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res) {
  toArray(res.pipe(parser()), function (err, rows) {
    if (err) throw err

    var codes = {}
    var headers = rows.shift().map(normalizeHeader)
    var reduceRows = generateRowMapper(headers)

    rows.forEach(function (row) {
      var obj = row.reduce(reduceRows, {})

      // skip unassigned codes
      if (obj.description === 'Unassigned') {
        return
      }

      // skip retired 306 code
      if (obj.value === '306') {
        return
      }

      codes[obj.value] = obj.description
    })

    write(path.join(__dirname, '../src/iana.json'), codes)
  })
})

function generateRowMapper (headers) {
  return function reduceRows (obj, val, index) {
    if (val !== '') {
      obj[headers[index]] = val
    }

    return obj
  }
}

function normalizeHeader (val) {
  return val.substr(0, 1).toLowerCase() + val.substr(1).replace(/ (.)/, function (s, c) {
    return c.toUpperCase()
  })
}
