"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for customer tokens.
 */
var CustomerTokenController = function () {
    function CustomerTokenController(app) {
        _classCallCheck(this, CustomerTokenController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new CustomerToken, return CustomerToken ID if successful
     * @param {string} email_address - The email address of the Customer
     * @param {string} password - The password of the Customer
     * @returns {Promise<any>}
     */


    _createClass(CustomerTokenController, [{
        key: "create",
        value: function create(email_address, password) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createCustomerTokenMutation ($email_address: String!, $password: String!) {\n                    createCustomerToken(email_address: $email_address, password: $password) {\n                        _id\n                        body\n                        created_at\n                        updated_at\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    email_address: email_address,
                    password: password
                }).then(function (result) {
                    resolve(result.createCustomerToken);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return CustomerTokenController;
}();

module.exports = CustomerTokenController;