"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for menu items.
 */
var MenuItemController = function () {
    function MenuItemController(app) {
        _classCallCheck(this, MenuItemController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.batchUpdate = this.batchUpdate.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new MenuItem, returns MenuItem _id if successful
     * @param {Object} menu_item - The MenuItem object
     * @returns {Promise<any>} - The id of the MenuItem object
     */


    _createClass(MenuItemController, [{
        key: "create",
        value: function create(menu_item) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createMenuItemMutation ($menu_item: CreateMenuItemInput!) {\n                    createMenuItem(menu_item: $menu_item) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    menu_item: menu_item
                }).then(function (result) {
                    resolve(result.createMenuItem._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update an existing MenuItem based on given ID/menu_item, returns _id if successful
         * @param {string} id - The id of the MenuItem Object
         * @param {Object} menu_item - The MenuItem Object
         * @returns {Promise<any>} - The id of the MenuItem object
         */

    }, {
        key: "update",
        value: function update(id, menu_item) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation updateMenuItemMutation ($id: String!, $menu_item: UpdateMenuItemInput!) {\n                    updateMenuItem(id: $id, menu_item: $menu_item) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, menu_item: menu_item
                }).then(function (result) {
                    resolve(result.updateMenuItem._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Batch update a list of menu items.
         * @param menu_items List of BatchUpdateMenuItemsInput
         * @returns {Promise<any>} List of menu items with _id field
         */

    }, {
        key: "batchUpdate",
        value: function batchUpdate(menu_items) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation batchUpdateMenuItems ($menu_items: [BatchUpdateMenuItemsInput]!) {\n                    batchUpdateMenuItems(menu_items: $menu_items) {\n                        _id\n                    }\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    menu_items: menu_items
                }).then(function (result) {
                    resolve(result.batchUpdateMenuItems);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Delete a MenuItem
         * @param {string} id - The id of the MenuItem Object
         * @returns {Promise<any>} - The id of the MenuItem object
         */

    }, {
        key: "delete",
        value: function _delete(id) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation deleteMenuItemMutation ($id: String!) {\n                    deleteMenuItem(id: $id)\n                }\n            ";
                _this4.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function () {
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return MenuItemController;
}();

module.exports = MenuItemController;