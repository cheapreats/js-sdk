"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller related to payouts
 */
var PayoutController = function () {
    function PayoutController(app) {
        _classCallCheck(this, PayoutController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.request = this.request.bind(this);
        this.update = this.update.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new payout request
     * @param {String} vendor_id - Vendor ID
     * @param {Boolean} dry - Dry run or not
     * @returns {Promise<{_id: string, total: number}>}
     */


    _createClass(PayoutController, [{
        key: "request",
        value: function request(vendor_id) {
            var _this = this;

            var dry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($vendor_id: String!, $dry: Boolean) {\n                    requestPayout(vendor_id: $vendor_id, dry: $dry) {\n                        _id\n                        total\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    vendor_id: vendor_id, dry: dry
                }).then(function (result) {
                    resolve(result.requestPayout);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update an existing pending payout
         * @param {String} id - Payout ID
         * @param {String} payout - Updated payout object
         * @returns {Promise<any>}
         */

    }, {
        key: "update",
        value: function update(id, payout) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!, $payout:UpdatePayoutInput!) {\n                    updatePayout(id: $id, payout: $payout) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, payout: payout
                }).then(function (result) {
                    resolve(result.updatePayout._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Cancel a Payout
         * @param {string} id - Payout ID
         * @returns {Promise<any>}
         */

    }, {
        key: "cancel",
        value: function cancel(id) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!) {\n                    cancelPayout(id: $id)\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.cancelPayout);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return PayoutController;
}();

module.exports = PayoutController;