'use strict'

var path = require('path')
var write = require('./lib/write')

// collect all the iana codes
var codes = require('../src/iana.json')

;[
  'rfc',
  'draft',
  'apache',
  'nginx',
  'node'
].forEach(function (src) {
  var json = require('../lib/' + src + '.json')
  Object.keys(json).forEach(function (key) {
    codes[key] = json[key]
  })
})

// write the JSON object
write(path.join(__dirname, '../codes.json'), codes)
