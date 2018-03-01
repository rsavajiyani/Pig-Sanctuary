var assert = require('assert');
var validatePhoneNumber = require('../routes/validator')

describe('Phone Validator', function() {
    it('return true if number is 10 digits', function() {
      assert.equal(validatePhoneNumber('1234567890'), true);
    });

    it('return false if number is not 10 digits', function() {
        assert.equal(validatePhoneNumber('12345678901'), false);
    });
});