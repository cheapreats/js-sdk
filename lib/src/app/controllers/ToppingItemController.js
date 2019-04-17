"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for topping items.
 */
var ToppingItemController = function () {
    function ToppingItemController(app) {
        _classCallCheck(this, ToppingItemController);

        this.app = app;
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new topping item
     * @param {string} name - The name of the Topping Object
     * @param {int} quantity - The amount of the Topping Object
     * @param {int} price - The cost of the Topping Object
     * @param {int} availableUntil - The length of time that this Topping Object is available
     * @returns {Promise<any>} - The id of the Topping Object
     */


    _createClass(ToppingItemController, [{
        key: "add",
        value: function add(name, quantity, price, availableUntil) {
            var _this = this;

            // addToppingItem(name: String!, quantity: Int!, price: Int!, availableUntil: Int!): ToppingItem
            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation addToppingItemMutation ($name: String!, $quantity: Int!, $price: Int!, $availableUntil: Int!) {\n                    addToppingItem(name: $name, quantity: $quantity, price: $price, availableUntil: $availableUntil) {\n                        id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    name: name, quantity: quantity, price: price, availableUntil: availableUntil
                }).then(function (result) {
                    resolve(result.addToppingItem.id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Update a topping item
         * @param {int} id - The id of the Topping Object
         * @param {string} name=null - The name of the Topping Object
         * @param {int} remainingQuantity=null - The amount of Toppings remaining
         * @param {int} availableUntil=null - The length of time that this Topping Object is available
         * @param toppingItems=null
         * @returns {Promise<any>} - The id of the Topping Object
         */

    }, {
        key: "update",
        value: function update(id) {
            var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var remainingQuantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var _this2 = this;

            var availableUntil = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var toppingItems = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

            // updateToppingItem(id: Int!, name: String, remainingQuantity: Int, price: Int, availableUntil: Int): ToppingItem
            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation updateToppingItemMutation ($id: Int!, $name: String, $remainingQuantity: Int, $price: Int, $availableUntil: Int) {\n                    updateToppingItem(id: $id, name: $name, remainingQuantity: $remainingQuantity, price: $price, availableUntil: $availableUntil) {\n                        id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, name: name, remainingQuantity: remainingQuantity, availableUntil: availableUntil, toppingItems: toppingItems
                }).then(function (result) {
                    resolve(result.updateToppingItem.id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Delete a topping item
         * @param {int} id - The id of the Topping Object
         * @returns {Promise<any>}
         */

    }, {
        key: "delete",
        value: function _delete(id) {
            var _this3 = this;

            // deleteToppingItem(id: Int!): Int
            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation deleteToppingItemMutation ($id: Int!) {\n                    deleteToppingItem(id: $id)\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function () {
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return ToppingItemController;
}();

module.exports = ToppingItemController;