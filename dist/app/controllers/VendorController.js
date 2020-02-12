"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for vendors.
 */
var VendorController = function () {
    function VendorController(app) {
        _classCallCheck(this, VendorController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.deleteVendorTester = this.deleteVendorTester.bind(this);
        this.addVendorTesterByEmailAddress = this.addVendorTesterByEmailAddress.bind(this);
        this.updateVendorApprovalStatus = this.updateVendorApprovalStatus.bind(this);
        this.requestVendorApproval = this.requestVendorApproval.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.createWithEmployee = this.createWithEmployee.bind(this);
        this.updateAllMenuItemsStatus = this.updateAllMenuItemsStatus.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Delete a vendor tester by ID.
     * @param id Vendor tester's ID.
     * @returns {Promise<string>}
     */


    _createClass(VendorController, [{
        key: "deleteVendorTester",
        value: function deleteVendorTester(id) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!) {\n                    deleteVendorTester(id: $id)\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.deleteVendorTester);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Add a new vendor tester by email address.
         * @param {string} id Vendor's ID.
         * @param {string} email_address Customer's email address to add as a tester.
         * @returns {Promise<any>}
         */

    }, {
        key: "addVendorTesterByEmailAddress",
        value: function addVendorTesterByEmailAddress(id, email_address) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!, $email_address: String!) {\n                    addVendorTesterByEmailAddress(id: $id, email_address: $email_address) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, email_address: email_address
                }).then(function (result) {
                    resolve(result.addVendorTesterByEmailAddress);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update a vendor's approval status, this can only be called by master.
         * @param {string} id ID of the vendor.
         * @param {string} approval_status New approval status, can be APPROVED, PENDING, NOT_APPROVED
         * @returns {Promise<string>}
         */

    }, {
        key: "updateVendorApprovalStatus",
        value: function updateVendorApprovalStatus(id, approval_status) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!, $approval_status: VendorApprovalStatus!) {\n                    updateVendorApprovalStatus(id: $id, approval_status: $approval_status) {\n                        _id\n                    }\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id, approval_status: approval_status
                }).then(function (result) {
                    resolve(result.updateVendorApprovalStatus._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Request profile approval from administrators before publishing the store.
         * @param {string} id ID of the vendor.
         * @returns {Promise<any>}
         */

    }, {
        key: "requestVendorApproval",
        value: function requestVendorApproval(id) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!) {\n                    requestVendorApproval(id: $id)\n                }\n            ";
                _this4.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.requestVendorApproval);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * TODO: Deprecate this method
         * Create a new vendor, return vendor ID if successful
         * @param {Object} vendor - The Vendor Object
         * @returns {Promise<any>}
         */

    }, {
        key: "create",
        value: function create(vendor) {
            var _this5 = this;

            console.warn("Vendor.create is deprecated, it is recommended for you to move to Vendor.createWithEmployee");
            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createVendorMutation ($vendor: CreateVendorInput!) {\n                    createVendor(vendor: $vendor) {\n                        _id\n                    }\n                }\n            ";
                _this5.app.getAdaptor().mutate(mutationString, {
                    vendor: vendor
                }).then(function (result) {
                    resolve(result.createVendor._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Create a new Vendor Object with an Employee Object
         * @param {Object} vendor - The Vendor Object
         * @returns {Promise<any>} - The id of the Vendor Object
         */

    }, {
        key: "createWithEmployee",
        value: function createWithEmployee(vendor) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createVendorWithEmployeeMutation($vendor: CreateVendorWithEmployeeInput!) {\n                    createVendorWithEmployee(vendor: $vendor) {\n                        _id\n                    }\n                }\n            ";
                _this6.app.getAdaptor().mutate(mutationString, {
                    vendor: vendor
                }).then(function (result) {
                    resolve(result.createVendorWithEmployee._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update a vendor
         * @param {string} id - The id of the Vendor Object
         * @param {Object} vendor - The Vendor Object
         * @returns {Promise<any>}
         */

    }, {
        key: "update",
        value: function update(id, vendor) {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation updateVendorMutation ($id: String!, $vendor: UpdateVendorInput!) {\n                    updateVendor(id: $id, vendor: $vendor) {\n                        _id\n                    }\n                }\n            ";
                _this7.app.getAdaptor().mutate(mutationString, {
                    id: id, vendor: vendor
                }).then(function (result) {
                    resolve(result.updateVendor._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update a vendor
         * @param {string} vendor_id - The id of the Vendor Object
         * @param {Object} status - Updated status of the items
         * @returns {Promise<any>}
         */

    }, {
        key: "updateAllMenuItemsStatus",
        value: function updateAllMenuItemsStatus(vendor_id, status) {
            var _this8 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($vendor_id: String!, $status: String!) {\n                    updateAllMenuItemsStatusForVendor(vendor_id: $vendor_id, status: $status)\n                }\n            ";
                _this8.app.getAdaptor().mutate(mutationString, {
                    vendor_id: vendor_id, status: status
                }).then(function (result) {
                    resolve(result.updateAllMenuItemsStatusForVendor);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return VendorController;
}();

module.exports = VendorController;