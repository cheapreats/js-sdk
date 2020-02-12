"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpLink = require('../links/synchronouslinks/HttpLink');
/**
 * Controller for validation services.
 */

var ValidationController = function () {
    function ValidationController(app) {
        _classCallCheck(this, ValidationController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.customerSignupEmail = this.customerSignupEmail.bind(this);
        this.customerSignupPhone = this.customerSignupPhone.bind(this);
    }

    _createClass(ValidationController, [{
        key: "getHttpLink",
        value: function getHttpLink() {
            var append = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            return new HttpLink(this.app.getConfiguration().endpoints.validationEndpoint.production + append);
        }
        // ADD MUTATION METHODS BELOW
        /**
         * Check if an email can be used for customer account creation
         * @param email - An email
         * @returns {Promise<any>}
         */

    }, {
        key: "customerSignupEmail",
        value: function customerSignupEmail(email) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var link = _this.getHttpLink("/customer/signup/email");
                link.post({
                    data: { email: email }
                }).then(function (data) {
                    resolve(data.data);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Check if a phone number can be used for customer account creation
         * @param phone - The phone number to send the code to (Without Country Code & no spaces/special characters)
         * @returns {Promise<any>}
         */

    }, {
        key: "customerSignupPhone",
        value: function customerSignupPhone(phone) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var link = _this2.getHttpLink("/customer/signup/phone");
                link.post({
                    data: { phone: phone }
                }).then(function (data) {
                    resolve(data.data);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return ValidationController;
}();

module.exports = ValidationController;