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
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.createWithEmployee = this.createWithEmployee.bind(this);
        this.updateAllMenuItemsStatus = this.updateAllMenuItemsStatus.bind(this);
    }

    /**
     * TODO: Deprecate this method
     * Create a new vendor, return vendor ID if successful
     * @param {Object} vendor - The Vendor Object
     * @returns {Promise<any>}
     */


    _createClass(VendorController, [{
        key: "create",
        value: function create(vendor) {
            var _this = this;

            console.warn("Vendor.create is deprecated, it is recommended for you to move to Vendor.createWithEmployee");
            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createVendorMutation ($vendor: CreateVendorInput!) {\n                    createVendor(vendor: $vendor) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
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
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createVendorWithEmployeeMutation($vendor: CreateVendorWithEmployeeInput!) {\n                    createVendorWithEmployee(vendor: $vendor) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
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
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation updateVendorMutation ($id: String!, $vendor: UpdateVendorInput!) {\n                    updateVendor(id: $id, vendor: $vendor) {\n                        _id\n                    }\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
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
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($vendor_id: String!, $status: String!) {\n                    updateAllMenuItemsStatusForVendor(vendor_id: $vendor_id, status: $status)\n                }\n            ";
                _this4.app.getAdaptor().mutate(mutationString, {
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