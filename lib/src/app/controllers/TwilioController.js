'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for all Twilio related endpoints
 * Author: Jun Zheng
 * License: UNLICENSED
 */

var HttpLink = require('../links/synchronouslinks/HttpLink');

/**
 * Controller for twilio.
 */

var TwilioController = function () {
    function TwilioController(app) {
        _classCallCheck(this, TwilioController);

        this.app = app;
        this.getCode = this.getCode.bind(this);
        this.canVerify = this.canVerify.bind(this);
    }

    /**
     * Get HttpLink appended with append
     * @param {string} append=""
     * @returns {HttpLink}
     */


    _createClass(TwilioController, [{
        key: 'getHttpLink',
        value: function getHttpLink() {
            var append = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            if (this.app.getAdaptorMode() === 'production') {
                return new HttpLink(this.app.getConfiguration().endpoints.restEndpoint.production + append);
            } else {
                return new HttpLink(this.app.getConfiguration().endpoints.restEndpoint.qa + append);
            }
        }

        /**
         * Get verification code sent to a phone
         * @param phoneNumber - The phone number to send the code to (Without Country Code & no spaces/special characters)
         * @param countryCode - The country code of the phone number (Ex: +1)
         * @returns {Promise<any>}
         */

    }, {
        key: 'getCode',
        value: function getCode(phoneNumber, countryCode) {
            var link = this.getHttpLink("/get_code");
            return new Promise(function (resolve, reject) {
                link.post({
                    data: {
                        phone_number: phoneNumber,
                        country_code: countryCode
                    }
                }).then(function () {
                    resolve(true);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Check if a phone number can be used to verify
         * @param phoneNumber - The phone number to send the code to (Without Country Code & no spaces/special characters)
         * @returns {Promise<any>}
         */

    }, {
        key: 'canVerify',
        value: function canVerify(phoneNumber) {
            var link = this.getHttpLink("/can_verify");
            return new Promise(function (resolve, reject) {
                link.post({
                    data: {
                        phone_number: phoneNumber
                    }
                }).then(function (data) {
                    if (data.data === "yes") {
                        resolve(true);
                    } else {
                        return Promise.reject();
                    }
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return TwilioController;
}();

module.exports = TwilioController;