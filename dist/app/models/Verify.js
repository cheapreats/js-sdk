'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpLink = require('../links/synchronouslinks/HttpLink');
// This is special, not really a model

var Verify = function () {
    function Verify(config) {
        _classCallCheck(this, Verify);

        this._getVerificationCodeLink = new HttpLink(config.getVerificationCodeEndpoint);
        this._twilioController = require('../controllers/TwilioController');
    }
    /**
     * Get a new verification code
     * @param phoneNumber
     * @param countryCode
     * @returns {*}
     */


    _createClass(Verify, [{
        key: 'getCode',
        value: function getCode(phoneNumber, countryCode) {
            return this._twilioController.getVerificationCode(this._getVerificationCodeLink, phoneNumber, countryCode);
        }
    }]);

    return Verify;
}();

module.exports = Verify;