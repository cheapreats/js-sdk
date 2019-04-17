"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for combo items.
 */
var ComboItemController = function () {
    function ComboItemController(app) {
        _classCallCheck(this, ComboItemController);

        this.app = app;
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new combo item
     * @param  {string} name - Name of Combo Item
     * @param  {int} discount - Discount Applied to Original Value of Items
     * @param  {string} availableFrom - Starting Date of Availability
     * @param  {string} availableUntil - Ending Date of Availability
     * @param  {Object} menuItems
     * @param  {int} recurringType=null - Weekly, Monthly etc
     * @param  {string} dayOfWeek=null - The days of the week in which the combo is active (Monday or Tuesday etc)
     * @returns {Promise<any>} - Returns the id of the combo item object added
     */


    _createClass(ComboItemController, [{
        key: "add",
        value: function add(name, discount, availableFrom, availableUntil, menuItems) {
            var _this = this;

            var recurringType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
            var dayOfWeek = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

            // addComboItem(name: String!, discount: Int!, availableFrom: String, availableUntil: String, menuItems: [ComboItemInput]!, recurringType: Int, dayOfWeek: String): ComboItem
            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation addComboItemMutation ($name: String!, $discount: Int!, $availableFrom: String!, $availableUntil: String!, $menuItems: [ComboItemInput]!, $recurringType: Int, $dayOfWeek: String) {\n                    addComboItem(name: $name, discount: $discount, availableFrom: $availableFrom, availableUntil: $availableUntil, menuItems: $menuItems, recurringType: $recurringType, dayOfWeek: $dayOfWeek) {\n                        id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    name: name, discount: discount, availableFrom: availableFrom, availableUntil: availableUntil, menuItems: menuItems, recurringType: recurringType, dayOfWeek: dayOfWeek
                }).then(function (result) {
                    resolve(result.addComboItem.id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Delete a combo item
         * @param {int} id - The unique identifier of the combo item object
         * @returns {Promise<any>}
         */

    }, {
        key: "delete",
        value: function _delete(id) {
            var _this2 = this;

            // deleteComboItem(id: Int!): Int
            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation deleteComboItemMutation ($id: Int!) {\n                    deleteComboItem(id: $id)\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function () {
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return ComboItemController;
}();

module.exports = ComboItemController;