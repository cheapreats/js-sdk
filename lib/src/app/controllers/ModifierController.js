"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for modifiers.
 */
var ModifierController = function () {
    function ModifierController(app) {
        _classCallCheck(this, ModifierController);

        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new Modifier
     * @param {Object} modifier - The Modifier Object
     * @returns {Promise<any>} - The id of the Modifier Object
     */


    _createClass(ModifierController, [{
        key: "create",
        value: function create(modifier) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createModifier ($modifier: CreateModifierInput!) {\n                    createModifier(modifier: $modifier) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    modifier: modifier
                }).then(function (result) {
                    resolve(result.createModifier._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Update an existing Modifier
         * @param {string} id - The id of the Modifier Object
         * @param {Object} modifier - The Modifier Object
         * @returns {Promise<any>} - The id of the Modifier Object
         */

    }, {
        key: "update",
        value: function update(id, modifier) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation updateModifier ($id: String!, $modifier: UpdateModifierInput!) {\n                    updateModifier(id: $id, modifier: $modifier) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, modifier: modifier
                }).then(function (result) {
                    resolve(result.updateModifier._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Delete an existing Modifier
         * @param {string} id - The id of the Modifier Object
         * @returns {Promise<any>}
         */

    }, {
        key: "delete",
        value: function _delete(id) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation deleteModifier ($id: String!) {\n                    deleteModifier(id: $id)\n                }\n            ";
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

    return ModifierController;
}();

module.exports = ModifierController;