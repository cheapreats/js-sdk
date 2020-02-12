"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for head offices.
 */
var HeadOfficeController = function () {
    function HeadOfficeController(app) {
        _classCallCheck(this, HeadOfficeController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new HeadOffice
     * @param {string} identifier - The identifier for the Head Office Object
     * @returns {Promise<any>} - The id of the Head Office object
     */


    _createClass(HeadOfficeController, [{
        key: "create",
        value: function create(identifier) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createHeadOffice ($identifier: String!) {\n                    createHeadOffice(identifier: $identifier) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    identifier: identifier
                }).then(function (result) {
                    resolve(result.createHeadOffice._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update a HeadOffice
         * @param {string} id - The id of the Head Office Object
         * @param {string} identifier - The identifier for the Head Office Object
         * @returns {Promise<any>} - The id of the Head Office object
         */

    }, {
        key: "update",
        value: function update(id, identifier) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation updateHeadOffice ($id: String!, $identifier: String!) {\n                    updateHeadOffice(id: $id, identifier: $identifier) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, identifier: identifier
                }).then(function (result) {
                    resolve(result.updateHeadOffice._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Delete a HeadOffice instance
         * @param {string} id - The id of the Head Office Object
         * @returns {Promise<any>}
         */

    }, {
        key: "delete",
        value: function _delete(id) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation deleteHeadOffice ($id: String!) {\n                    deleteHeadOffice(id: $id)\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.deleteHeadOffice);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return HeadOfficeController;
}();

module.exports = HeadOfficeController;