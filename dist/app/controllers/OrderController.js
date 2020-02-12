"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for orders.
 */
var OrderController = function () {
    function OrderController(app) {
        _classCallCheck(this, OrderController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.cancel = this.cancel.bind(this);
        this.beginPreparing = this.beginPreparing.bind(this);
        this.prepared = this.prepared.bind(this);
        this.complete = this.complete.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Place a new order, you must be authenticated as a customer to use this
     * @param {Object} order - The Order Object
     * @param {Boolean} [dry] - Indicator for dry order placement
     * @param {Boolean} [clear_cart] - Indicator to clear all cart after order placement
     * @returns {Promise<any>} - The id of the Order Object
     */


    _createClass(OrderController, [{
        key: "create",
        value: function create(order, dry, clear_cart) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createOrderMutation ($order: CreateOrderInput!, $dry: Boolean, $clear_cart: Boolean) {\n                    createOrder(order: $order, dry: $dry, clear_cart: $clear_cart) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    order: order, dry: dry, clear_cart: clear_cart
                }).then(function (result) {
                    resolve(result.createOrder._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Cancel a order, must be authenticated as vendor
         * @param {string} id - The id of the Order Object
         * @param {string} reason - input type OrderCancellationReason enum indicating reason
         * @param {String} description - Additional details on order cancellation
         * @returns {Promise<any>}
         */

    }, {
        key: "cancel",
        value: function cancel(id, reason) {
            var _this2 = this;

            var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation cancelOrderMutation ($id: String!, $reason: OrderCancellationReason!, $description: String){\n                    cancelOrder(id: $id, reason: $reason, description: $description){\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, reason: reason, description: description
                }).then(function (result) {
                    resolve(result);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Set a order as preparing with estimated time
         * @param {string} id - The id of the Order Object
         * @param {int} estimated_preparing_sec - The amount of time the Order will take before it will be prepared
         * @returns {Promise<any>}
         */

    }, {
        key: "beginPreparing",
        value: function beginPreparing(id, estimated_preparing_sec) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation beginPreparingOrder($id: String!, $estimated_preparing_sec: Int!){\n                    beginPreparingOrder(id: $id, estimated_preparing_sec: $estimated_preparing_sec){\n                        _id\n                    }\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id, estimated_preparing_sec: estimated_preparing_sec
                }).then(function (result) {
                    resolve(result);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Set order as prepared
         * @param {string} id - The id of the Order Object
         * @returns {Promise<any>}
         */

    }, {
        key: "prepared",
        value: function prepared(id) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation preparedOrderMutation ($id: String!){\n                    preparedOrder (id: $id){\n                        _id\n                    }\n                }\n            ";
                _this4.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Complete an order
         * @param {string} id - The id of the Order Object
         * @returns {Promise<any>}
         */

    }, {
        key: "complete",
        value: function complete(id) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation completeOrderMutation ($id: String!){\n                    completeOrder(id: $id){\n                        _id\n                    }\n                }\n            ";
                _this5.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return OrderController;
}();

module.exports = OrderController;