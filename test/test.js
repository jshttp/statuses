
var assert = require('assert')

var status = require('..')

describe('Statuses', function () {
  describe('codes', function () {
    it('should include all of node\'s', function () {
      var codes = require('http').STATUS_CODES
      Object.keys(codes).forEach(function (code) {
        assert(status(code))
      })
    })
  })

  describe('.redirect', function () {
    it('should include 308', function () {
      assert(status.redirect[308])
    })
  })

  describe('status', function () {
    describe('(number)', function () {
      it('should be truthy when valid', function () {
        assert(status(404))
      })

      it('should throw when invalid', function () {
        assert.throws(function () {
          status(0)
        })
      })
    })

    describe('(number string)', function () {
      it('should be truthy when valid', function () {
        assert(status('404'))
      })

      it('should throw when invalid', function () {
        assert.throws(function () {
          status('0')
        })
      })
    })

    describe('(status string)', function () {
      it('should be truthy when valid', function () {
        assert(status('Not Found'))
      })

      it('should throw when invalid', function () {
        assert.throws(function () {
          status('asdf')
        })
      })
    })

    it('should throw a TypeError on anything but numbers and strings', function () {
      assert.throws(function () {
        status([])
      })
    })
  })
})
