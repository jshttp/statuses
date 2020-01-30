'use strict'

var getBody = require('raw-body')
var https = require('https')
var path = require('path')
var write = require('./lib/write')

var URL = 'https://raw.githubusercontent.com/nodejs/node/master/lib/_http_server.js'
var HEADERS = { 'User-Agent': 'nodejs/' + process.version + ' (' + process.platform + ', npm:statuses)' }

https.get(URL, { headers: HEADERS }, function onResponse (res) {
  getBody(res, true, function (err, body) {
    if (err) throw err

    var block = /STATUS_CODES\s*=\s*{([^}]+)};/m.exec(body)[1]
    var codes = {}
    var match
    var regexp = /([0-9]+): '([^\\']*(?:\\'[^\\']*)*)'/g

    while ((match = regexp.exec(block))) {
      codes[match[1]] = match[2].replace(/\\'/g, "'")
    }

    write(path.join(__dirname, '../src/node.json'), codes)
  })
})
