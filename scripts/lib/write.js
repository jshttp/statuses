'use strict'

var fs = require('fs')

module.exports = function write (path, obj) {
  var fd = fs.openSync(path, 'w')
  var keys = Object.keys(obj).sort()

  fs.writeSync(fd, '{\n')

  keys.forEach(function (key, i, arr) {
    fs.writeSync(fd, '  ' + JSON.stringify(key) +
      ': ' + JSON.stringify(obj[key]) +
      endLine.apply(this, arguments))
  })

  fs.writeSync(fd, '}\n')

  fs.closeSync(fd)
}

function endLine (val, index, array) {
  var comma = index + 1 === array.length
    ? ''
    : ','
  return comma + '\n'
}
