
// collect all the iana codes
var codes = require('../src/iana.json')
.slice(1) // remove the header
.filter(function (code) {
  return code[1] !== 'Unassigned'
})

;[
  'rfc',
  'draft',
  'apache',
  'nginx',
  'node',
].forEach(function (src) {
  var json = require('../lib/' + src + '.json')
  Object.keys(json).forEach(function (key) {
    codes.push([key, json[key]])
  })
})

// create a JSON object sorted by status code
var json = {}
codes.sort().forEach(function (code) {
  json[code[0]] = code[1]
})

// write the JSON object
require('fs').writeFile('codes.json', JSON.stringify(json, null, 2))
