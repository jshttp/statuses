
var fs = require('fs');
var codes = require('http').STATUS_CODES;

fs.writeFile('codes.json', JSON.stringify(codes));
