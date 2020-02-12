'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpLink = require('../links/synchronouslinks/HttpLink');
/**
 * Controller for notifications services.
 */

var NotificationController = function () {
    function NotificationController(app) {
        _classCallCheck(this, NotificationController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.test = this.test.bind(this);
        this.apnsEnrollCustomer = this.apnsEnrollCustomer.bind(this);
        this.apnsRevokeCustomer = this.apnsRevokeCustomer.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Get HttpLink appended with append
     * @param {string} append=""
     * @returns {HttpLink}
     */


    _createClass(NotificationController, [{
        key: 'getHttpLink',
        value: function getHttpLink() {
            var append = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            if (this.app.getAdaptorMode() === 'production') {
                return new HttpLink(this.app.getConfiguration().endpoints.notificationEndpoint.production + append);
            } else {
                return new HttpLink(this.app.getConfiguration().endpoints.notificationEndpoint.qa + append);
            }
        }
        // ADD MUTATION METHODS BELOW
        /**
         * Enroll a customer iOS device, authentication required
         * @param apnsToken
         * @returns {Promise<any>}
         */

    }, {
        key: 'apnsEnrollCustomer',
        value: function apnsEnrollCustomer(apnsToken) {
            var _this = this;

            var link = this.getHttpLink("/api/APNSEnrollCustomer");
            return new Promise(function (resolve, reject) {
                link.post({
                    data: JSON.stringify({
                        apnsToken: apnsToken,
                        authenticationToken: _this.app.getAuthenticationToken()
                    }),
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(function () {
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Revoke an iOS device
         * @param apnsToken
         * @returns {Promise<any>}
         */

    }, {
        key: 'apnsRevokeCustomer',
        value: function apnsRevokeCustomer(apnsToken) {
            var link = this.getHttpLink("/api/APNSRevokeCustomer");
            return new Promise(function (resolve, reject) {
                link.post({
                    data: JSON.stringify({
                        apnsToken: apnsToken
                    }),
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(function () {
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return NotificationController;
}();

module.exports = NotificationController;