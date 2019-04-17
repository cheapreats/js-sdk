"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for verification.
 */
var VerificationController = function () {
    function VerificationController(app) {
        _classCallCheck(this, VerificationController);

        this.app = app;
        this.startVerificationSession = this.startVerificationSession.bind(this);
        this.checkVerificationSession = this.checkVerificationSession.bind(this);
    }

    /**
     * Start a new SMS verification Session
     * @param {string} phone_number - The phone to be verified
     * @returns {Promise<any>} - The uuid required to verify the verification code
     */


    _createClass(VerificationController, [{
        key: "startVerificationSession",
        value: function startVerificationSession(phone_number) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createSmsVerificationSessionMutation ($phone_number:String!) {\n                    createSmsVerificationSession(phone_number:$phone_number) {\n                        uuid\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    phone_number: phone_number
                }).then(function (result) {
                    resolve(result);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Verify an Phone number via code received
         * @param {string} uuid - UUID of the verification request
         * @param {string} verification_code - Verification code received on the device
         * @returns {Promise<any>} - verification status along with the number corresponding to the UUID
         */

    }, {
        key: "checkVerificationSession",
        value: function checkVerificationSession(uuid, verification_code) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation verifySmsVerificationSessionMutation ($uuid:String!, $verification_code:String!) {\n                    verifySmsVerificationSession(uuid:$uuid, verification_code:$verification_code) {\n                        phone_number,\n                        verified_status\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    uuid: uuid, verification_code: verification_code
                }).then(function (result) {
                    resolve(result);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return VerificationController;
}();

module.exports = VerificationController;