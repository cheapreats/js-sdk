"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for loyalty programs.
 */
var LoyaltyProgramController = function () {
    function LoyaltyProgramController(app) {
        _classCallCheck(this, LoyaltyProgramController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new Loyalty Program, returns LoyaltyProgram _id if successful
     * @param {Object} loyalty_program - The LoyaltyProgram object input
     * @returns {Promise<any>} - The id of the LoyaltyProgram object
     */


    _createClass(LoyaltyProgramController, [{
        key: "create",
        value: function create(loyalty_program) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($loyalty_program: CreateLoyaltyProgramInput!) {\n                    createLoyaltyProgram(loyalty_program: $loyalty_program) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    loyalty_program: loyalty_program
                }).then(function (result) {
                    resolve(result.createLoyaltyProgram._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update an existing Loyalty Program, returns LoyaltyProgram _id if successful
         * @param {Object} id - ID of the LoyaltyProgram object to update
         * @param {Object} loyalty_program - The LoyaltyProgram update object input
         * @returns {Promise<any>} - The id of the LoyaltyProgram object
         */

    }, {
        key: "update",
        value: function update(id, loyalty_program) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id:String!, $loyalty_program: UpdateLoyaltyProgramInput!) {\n                    updateLoyaltyProgram(id:$id, loyalty_program: $loyalty_program) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id,
                    loyalty_program: loyalty_program
                }).then(function (result) {
                    resolve(result.updateLoyaltyProgram._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Delete a Loyalty Program
         * @param {string} id - The id of the Loyalty Program
         * @returns {Promise<any>} - Return string
         */

    }, {
        key: "delete",
        value: function _delete(id) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!) {\n                    deleteLoyaltyProgram(id: $id)\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.deleteLoyaltyProgram);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return LoyaltyProgramController;
}();

module.exports = LoyaltyProgramController;