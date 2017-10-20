'use strict'

var path = require('path')
var write = require('./lib/write')

// all codes
var codes = {}

// initialize with all IANA codes
addData(codes, require('../src/iana.json'))

// add the codes from nginx
addData(codes, require('../lib/nginx.json'))

// add the codes from apache
addData(codes, require('../lib/apache.json'))

// add the codes from node
addData(codes, require('../lib/node.json'))

// add the rfc codes
addData(codes, require('../lib/rfc.json'))

// add the draft codes
addData(codes, require('../lib/draft.json'))

// write the JSON object
write(path.join(__dirname, '../codes.json'), codes)

function addData (db, obj) {
  Object.keys(obj).forEach(function (key) {
    db[key] = db[key] || obj[key]
  })
}
