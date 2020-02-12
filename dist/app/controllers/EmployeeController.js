'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for employees.
 */
var EmployeeController = function () {
    function EmployeeController(app) {
        _classCallCheck(this, EmployeeController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.enrollTerminalFcm = this.enrollTerminalFcm.bind(this);
        this.revokeTerminalFcm = this.revokeTerminalFcm.bind(this);
        this.resetEmployeePassword = this.resetEmployeePassword.bind(this);
        this.sendPasswordResetCode = this.sendPasswordResetCode.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new employee, return employee ID if successful
     * @param {Object} employee - The Employee Object
     * @returns {Promise<any>} - The id of the Employee Object
     */


    _createClass(EmployeeController, [{
        key: 'create',
        value: function create(employee) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation createEmployeeMutation ($employee: CreateEmployeeInput!) {\n                    createEmployee(employee: $employee) {\n                        _id\n                    }\n                }\n            ';
                _this.app.getAdaptor().mutate(mutationString, {
                    employee: employee
                }).then(function (result) {
                    resolve(result.createEmployee._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update a employee
         * @param {string} id - The id of the Employee Object
         * @param {Object} employee - The Employee Object
         * @returns {Promise<any>} - The id of the Employee Object
         */

    }, {
        key: 'update',
        value: function update(id, employee) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation updateEmployeeMutation ($id: String!, $employee: UpdateEmployeeInput!) {\n                    updateEmployee(id: $id, employee: $employee) {\n                        _id\n                    }\n                }\n            ';
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id,
                    employee: employee
                }).then(function (result) {
                    resolve(result.updateEmployee._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Delete a Employee instance
         * @param {string} id - The id of the Employee Object
         * @returns {Promise<any>}
         */

    }, {
        key: 'delete',
        value: function _delete(id) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation deleteEmployee ($id: String!) {\n                    deleteEmployee(id: $id)\n                }\n            ';
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.deleteEmployee);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Enroll a new FCM token for terminal app
         * @param {string} id - The id of the Employee Object
         * @param {string} token - The FCM token for the Terminal Mobile App
         * @returns {Promise<any>}
         */

    }, {
        key: 'enrollTerminalFcm',
        value: function enrollTerminalFcm(id, token) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation enrollEmployeeTerminalFcmToken ($id: String!, $token: String!) {\n                    enrollEmployeeTerminalFcmToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ';
                _this4.app.getAdaptor().mutate(mutationString, {
                    id: id, token: token
                }).then(function (result) {
                    resolve(result.enrollEmployeeTerminalFcmToken);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Revoke a FCM token for terminal app
         * @param {string} token - The FCM token for the Terminal Mobile App
         * @returns {Promise<any>}
         */

    }, {
        key: 'revokeTerminalFcm',
        value: function revokeTerminalFcm(token) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation revokeEmployeeTerminalFcmToken ($token: String!) {\n                    revokeEmployeeTerminalFcmToken(token: $token)\n                }\n            ';
                _this5.app.getAdaptor().mutate(mutationString, {
                    token: token
                }).then(function (result) {
                    resolve(result.revokeEmployeeTerminalFcmToken);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Resets an employee password
         * @param {string} id - Id of the employee
         * @param {string} email_address - Email address of the employee
         * @param {string} code - Reset code
         * @param {string} password - The new password to set
         * @returns {Promise<any>}
         */

    }, {
        key: 'resetEmployeePassword',
        value: function resetEmployeePassword(id, email_address, code, password) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation resetEmployeePassword ($id: String, $email_address:String, $code:String!, $password:String!) {\n                    resetEmployeePassword(id: $id, email_address: $email_address, code: $code, password: $password) {\n                        _id\n                    }\n                }\n            ';
                _this6.app.getAdaptor().mutate(mutationString, {
                    id: id, email_address: email_address, code: code, password: password
                }).then(function (result) {
                    resolve(result.resetEmployeePassword._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Sends a password reset code to employee
         * @param {string} email_address - Id of the employee
         * @param {string} method - The new password to set
         * @returns {Promise<any>}
         */

    }, {
        key: 'sendPasswordResetCode',
        value: function sendPasswordResetCode(email_address) {
            var _this7 = this;

            var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EMAIL';

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation sendEmployeePasswordResetCode ($email_address: String!, $method:ResetCodeSendMethod) {\n                    sendEmployeePasswordResetCode(email_address: $email_address, method:$method)\n                }\n            ';
                _this7.app.getAdaptor().mutate(mutationString, {
                    email_address: email_address, method: method
                }).then(function (result) {
                    resolve(result.sendEmployeePasswordResetCode);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return EmployeeController;
}();

module.exports = EmployeeController;