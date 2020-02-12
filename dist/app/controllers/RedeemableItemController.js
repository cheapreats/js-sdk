"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for redeemable items.
 */
var RedeemableItemController = function () {
    function RedeemableItemController(app) {
        _classCallCheck(this, RedeemableItemController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new Redeemable Item, returns RedeemableItem _id if successful
     * @param {Object} redeemable_item - The RedeemableItem object input
     * @returns {Promise<any>} - The id of the RedeemableItem object
     */


    _createClass(RedeemableItemController, [{
        key: "create",
        value: function create(redeemable_item) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createRedeemableItem ($redeemable_item: CreateRedeemableItemInput!) {\n                    createRedeemableItem(redeemable_item: $redeemable_item) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    redeemable_item: redeemable_item
                }).then(function (result) {
                    resolve(result.createRedeemableItem._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update an existing RedeemableItem, returns RedeemableItem _id if successful
         * @param {Object} id - ID of the RedeemableItem object to update
         * @param {Object} redeemable_item - The RedeemableItem update object input
         * @returns {Promise<any>} - The id of the RedeemableItem object
         */

    }, {
        key: "update",
        value: function update(id, redeemable_item) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id:String!, $redeemable_item: UpdateRedeemableItemInput!) {\n                    updateRedeemableItem(id: $id, redeemable_item: $redeemable_item) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, redeemable_item: redeemable_item
                }).then(function (result) {
                    resolve(result.updateRedeemableItem._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Delete a RedeemableItem
         * @param {string} id - The id of the RedeemableItem
         * @returns {Promise<any>} - Return string
         */

    }, {
        key: "delete",
        value: function _delete(id) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!) {\n                    deleteRedeemableItem(id: $id)\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.deleteRedeemableItem);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return RedeemableItemController;
}();

module.exports = RedeemableItemController;