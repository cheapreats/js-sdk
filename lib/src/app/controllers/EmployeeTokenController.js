"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for employee tokens.
 */
var EmployeeTokenController = function () {
    function EmployeeTokenController(app) {
        _classCallCheck(this, EmployeeTokenController);

        this.app = app;
        this.create = this.create.bind(this);
    }

    /**
     * Create a new EmployeeToken, return EmployeeToken ID if successful
     * @param {string} vendor_id - The id of the Vendor this employee will be assigned to
     * @param {string} username - The Username of the Employee
     * @param {string} password - The password of the Employee
     * @returns {Promise<any>}
     */


    _createClass(EmployeeTokenController, [{
        key: "create",
        value: function create(vendor_id, username, password) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createEmployeeTokenMutation ($vendor_id: String!, $username: String!, $password: String!) {\n                    createEmployeeToken(vendor_id: $vendor_id, username: $username, password: $password) {\n                        body\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    vendor_id: vendor_id,
                    username: username,
                    password: password
                }).then(function (result) {
                    resolve(result.createEmployeeToken.body);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return EmployeeTokenController;
}();

module.exports = EmployeeTokenController;