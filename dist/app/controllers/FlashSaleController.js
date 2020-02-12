"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller related to flash sales
 */
var FlashSaleController = function () {
    function FlashSaleController(app) {
        _classCallCheck(this, FlashSaleController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new flash sale
     * @param {String} vendor_id - Vendor ID
     * @param {String} type - If the flash sale is on PERCENTAGE or DOLLAR basis
     * @param {int} amount - Amount in cents to base the flash sale off of
     * @param {Object[]} items - List of items included in Flash Sale
     * @param {String} start_at - Start time for Flash Sale in ISO format
     * @param {String} end_at - End time for Flash Sale in ISO format
     * @returns {Promise<any>}
     */


    _createClass(FlashSaleController, [{
        key: "create",
        value: function create(vendor_id, type, amount, items, start_at, end_at) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation($vendor_id: String!, $type: FlashSaleType!, $amount: Int!, $items: [FlashSaleItemInput]!, $start_at: String!, $end_at: String!) {\n                    createFlashSale(vendor_id: $vendor_id, type: $type, amount: $amount, items:$items, start_at:$start_at, end_at:$end_at) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    vendor_id: vendor_id, type: type, amount: amount, items: items, start_at: start_at, end_at: end_at
                }).then(function (result) {
                    resolve(result.createFlashSale._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update existing flash sale
         * @param {String} id - Flash Sale ID
         * @param {Object[]} items - Updated List of items for Flash Sale
         * @param {String} end_at - End time for Flash Sale in ISO format
         * @returns {Promise<any>}
         */

    }, {
        key: "update",
        value: function update(id, items, end_at) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation($id: String!, $items: [FlashSaleItemInput], $end_at: String) {\n                    updateFlashSale(id: $id, items:$items, end_at:$end_at) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, items: items, end_at: end_at
                }).then(function (result) {
                    resolve(result.updateFlashSale._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return FlashSaleController;
}();

module.exports = FlashSaleController;