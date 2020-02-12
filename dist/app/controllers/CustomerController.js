'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for customers.
 */
var CustomerController = function () {
    function CustomerController(app) {
        _classCallCheck(this, CustomerController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.updateCreditCard = this.updateCreditCard.bind(this);
        this.enrollApnsToken = this.enrollApnsToken.bind(this);
        this.revokeApnsToken = this.revokeApnsToken.bind(this);
        this.enrollFcmToken = this.enrollFcmToken.bind(this);
        this.revokeFcmToken = this.revokeFcmToken.bind(this);
        this.createWallet = this.createWallet.bind(this);
        this.reloadWallet = this.reloadWallet.bind(this);
        this.sendPasswordResetCode = this.sendPasswordResetCode.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.refundWallet = this.refundWallet.bind(this);
        this.createWalletTransaction = this.createWalletTransaction.bind(this);
        this.addFavouriteVendor = this.addFavouriteVendor.bind(this);
        this.removeFavouriteVendor = this.removeFavouriteVendor.bind(this);
        this.addFavouriteItem = this.addFavouriteItem.bind(this);
        this.removeFavouriteItem = this.removeFavouriteItem.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new customer, return customer ID if successful
     * @param {Object} customer - The Customer object to be created
     * @returns {Promise<any>} - The id of the Customer object that was created
     */


    _createClass(CustomerController, [{
        key: 'create',
        value: function create(customer) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation createCustomerMutation ($customer: CreateCustomerInput!) {\n                    createCustomer(customer: $customer) {\n                        _id\n                    }\n                }\n            ';
                _this.app.getAdaptor().mutate(mutationString, {
                    customer: customer
                }).then(function (result) {
                    resolve(result.createCustomer._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update a customer
         * @param {string} id - The id of the Customer object
         * @param {Object} customer - The updated Customer object
         * @returns {Promise<any>} - The id of the Customer Object that was updated
         */

    }, {
        key: 'update',
        value: function update(id, customer) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation updateCustomerMutation ($id: String!, $customer: UpdateCustomerInput!) {\n                    updateCustomer(id: $id, customer: $customer) {\n                        _id\n                    }\n                }\n            ';
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, customer: customer
                }).then(function (result) {
                    resolve(result.updateCustomer._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Enroll a new APNs token
         * @param {string} id - The id of the Customer Object
         * @param {string} token - The APNS Token
         * @returns {Promise<any>}
         */

    }, {
        key: 'enrollApnsToken',
        value: function enrollApnsToken(id, token) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation enrollCustomerApnsTokenMutation ($id: String!, $token: String!) {\n                    enrollCustomerApnsToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ';
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id, token: token
                }).then(function (result) {
                    resolve(result.enrollCustomerApnsToken);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Revoke an APNs token
         * @param {string} id - The id of the Customer Object
         * @param {string} token - The APNS Token
         * @returns {Promise<any>}
         */

    }, {
        key: 'revokeApnsToken',
        value: function revokeApnsToken(id, token) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation revokeCustomerApnsTokenMutation ($id: String!, $token: String!) {\n                    revokeCustomerApnsToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ';
                _this4.app.getAdaptor().mutate(mutationString, {
                    id: id, token: token
                }).then(function (result) {
                    resolve(result.revokeCustomerApnsToken);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Enroll a new FCM token
         * @param {string} id - The id of the Customer Object
         * @param {string} token - The FCM Token
         * @returns {Promise<any>}
         */

    }, {
        key: 'enrollFcmToken',
        value: function enrollFcmToken(id, token) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation enrollCustomerFcmTokenMutation ($id: String!, $token: String!) {\n                    enrollCustomerFcmToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ';
                _this5.app.getAdaptor().mutate(mutationString, {
                    id: id, token: token
                }).then(function (result) {
                    resolve(result.enrollCustomerFcmToken);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Revoke an FCM token
         * @param {string} id - The id of the Customer Object
         * @param {string} token - The FCM Token
         * @returns {Promise<any>}
         */

    }, {
        key: 'revokeFcmToken',
        value: function revokeFcmToken(id, token) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation revokeCustomerFcmTokenMutation ($id: String!, $token: String!) {\n                    revokeCustomerFcmToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ';
                _this6.app.getAdaptor().mutate(mutationString, {
                    id: id, token: token
                }).then(function (result) {
                    resolve(result.revokeCustomerFcmToken);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Update a customer's credit card
         * @param {string} id - The id of the Customer Object
         * @param {string} token - The Stripe Token
         * @returns {Promise<any>}
         */

    }, {
        key: 'updateCreditCard',
        value: function updateCreditCard(id, token) {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation updateCustomerCreditCardMutation ($id: String!, $token: String!) {\n                    updateCustomerCreditCard(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ';
                _this7.app.getAdaptor().mutate(mutationString, {
                    id: id, token: token
                }).then(function (result) {
                    resolve(result.updateCustomerCreditCard);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Create Customer Wallet
         * @param {string} id - The id of the Customer Object
         * @returns {Promise<any>} - The id of the wallet that was created
         */

    }, {
        key: 'createWallet',
        value: function createWallet(id) {
            var _this8 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation createCustomerWallet ($id: String!) {\n                    createCustomerWallet(id: $id) {\n                        _id\n                    }\n                }\n            ';
                _this8.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.createCustomerWallet._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Reload customer wallet
         * @param {string} id - The id of the Customer Object
         * @param  {int} amount - The amount to load the wallet (in cents)
         * @param  {string} payment_method - The selected payment method
         * @returns {Promise<any>} - The id of the wallet that was reloaded
         */

    }, {
        key: 'reloadWallet',
        value: function reloadWallet(id, amount, payment_method) {
            var _this9 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation reloadCustomerWallet ($id: String!, $amount: Int!, $payment_method: String!) {\n                    reloadCustomerWallet(id: $id, amount: $amount, payment_method: $payment_method) {\n                        _id\n                    }\n                }\n            ';
                _this9.app.getAdaptor().mutate(mutationString, {
                    id: id, amount: amount, payment_method: payment_method
                }).then(function (result) {
                    resolve(result.reloadCustomerWallet._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Send password reset code to customer
         * @param  {string} email_address - The email address of the customer
         * @param  {string} method - The method to receive the code on, either EMAIL (default) or SMS
         */

    }, {
        key: 'sendPasswordResetCode',
        value: function sendPasswordResetCode(email_address) {
            var _this10 = this;

            var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EMAIL';

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation sendCustomerPasswordResetCode ($email_address: String!, $method: ResetCodeSendMethod) {\n                    sendCustomerPasswordResetCode(email_address: $email_address, method:$method)\n                }\n            ';
                _this10.app.getAdaptor().mutate(mutationString, {
                    email_address: email_address, method: method
                }).then(function (result) {
                    resolve(result.sendCustomerPasswordResetCode);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Reset Customer Password
         * @param  {string} email_address - The email address of the customer
         * @param  {string} code - Temporary Code for Password Resets
         * @param  {string} password - The new password
         */

    }, {
        key: 'resetPassword',
        value: function resetPassword(email_address, code, password) {
            var _this11 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation resetCustomerPassword ($email_address: String!, $code: String!, $password: String!) {\n                    resetCustomerPassword(email_address: $email_address, code: $code, password: $password) {\n                        _id\n                    }\n                }\n            ';
                _this11.app.getAdaptor().mutate(mutationString, {
                    email_address: email_address, code: code, password: password
                }).then(function (result) {
                    resolve(result.resetCustomerPassword._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Refund customer wallet by vendor
         * @param {string} id - The id of the Customer
         * @param  {int} vendor_id - ID of the Vendor issuing the refund
         * @param  {string} amount - The amount to refund the wallet (in cents)
         * @param  {String} order_id - Optional orderId selected payment method
         * @returns {Promise<any>} - The id of the wallet that was reloaded
         */

    }, {
        key: 'refundWallet',
        value: function refundWallet(id, vendor_id, amount) {
            var _this12 = this;

            var order_id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation ($id: String!, $vendor_id: String!, $amount: Int!, $order_id: String) {\n                    refundCustomerWallet(id: $id, vendor_id: $vendor_id, amount: $amount, order_id: $order_id) {\n                        _id\n                    }\n                }\n            ';
                _this12.app.getAdaptor().mutate(mutationString, {
                    id: id, vendor_id: vendor_id, amount: amount, order_id: order_id
                }).then(function (result) {
                    resolve(result.refundCustomerWallet._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Create a wallet transaction for customer
         * @param {string} id - The id of the Customer
         * @param  {int} transaction_type - Transaction type, either 'reload' or 'purchase'
         * @param  {string} amount - The amount in cents
         * @param  {string} description - Optional description for transaction
         * @returns {Promise<any>} - The id of the wallet that was reloaded
         */

    }, {
        key: 'createWalletTransaction',
        value: function createWalletTransaction(id, transaction_type, amount) {
            var _this13 = this;

            var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation ($id: String!, $transaction_type: String!, $amount: Int!, $description: String) {\n                    createCustomerWalletTransaction(id: $id, transaction_type: $transaction_type, amount: $amount, description: $description) {\n                        _id\n                    }\n                }\n            ';
                _this13.app.getAdaptor().mutate(mutationString, {
                    id: id, transaction_type: transaction_type, amount: amount, description: description
                }).then(function (result) {
                    resolve(result.createCustomerWalletTransaction._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Add a favourite vendor for customer
         * @param {string} id - The id of the Customer
         * @param  {int} vendor_id - The id of the vendor
         * @returns {Promise<any>} - The id of customer whose favourite vendor was updated
         */

    }, {
        key: 'addFavouriteVendor',
        value: function addFavouriteVendor(id, vendor_id) {
            var _this14 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation ($id: String!, $vendor_id: String!) {\n                    addFavouriteVendorForCustomer (id: $id, vendor_id: $vendor_id) {\n                        _id\n                    }\n                }\n            ';
                _this14.app.getAdaptor().mutate(mutationString, {
                    id: id, vendor_id: vendor_id
                }).then(function (result) {
                    resolve(result.addFavouriteVendorForCustomer._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Remove a favourite vendor for customer
         * @param {string} id - The id of the Customer
         * @param  {int} vendor_id - The id of the vendor
         * @returns {Promise<any>} - The id of customer whose favourite vendor was updated
         */

    }, {
        key: 'removeFavouriteVendor',
        value: function removeFavouriteVendor(id, vendor_id) {
            var _this15 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation ($id: String!, $vendor_id: String!) {\n                    removeFavouriteVendorForCustomer (id: $id, vendor_id: $vendor_id) {\n                        _id\n                    }\n                }\n            ';
                _this15.app.getAdaptor().mutate(mutationString, {
                    id: id, vendor_id: vendor_id
                }).then(function (result) {
                    resolve(result.removeFavouriteVendorForCustomer._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Add a favourite item for customer
         * @param {string} id - The id of the Customer
         * @param  {int} item_id - The id of the item
         * @returns {Promise<any>} - The id of customer whose favourite item was updated
         */

    }, {
        key: 'addFavouriteItem',
        value: function addFavouriteItem(id, item_id) {
            var _this16 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation ($id: String!, $item_id: String!) {\n                    addFavouriteItemForCustomer (id: $id, item_id: $item_id) {\n                        _id\n                    }\n                }\n            ';
                _this16.app.getAdaptor().mutate(mutationString, {
                    id: id, item_id: item_id
                }).then(function (result) {
                    resolve(result.addFavouriteItemForCustomer._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Remove a favourite item for customer
         * @param {string} id - The id of the Customer
         * @param  {int} item_id - The id of the item
         * @returns {Promise<any>} - The id of customer whose favourite item was updated
         */

    }, {
        key: 'removeFavouriteItem',
        value: function removeFavouriteItem(id, item_id) {
            var _this17 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = '\n                mutation ($id:String!, $item_id:String!) {\n                    removeFavouriteItemForCustomer (id:$id, item_id:$item_id) {\n                        _id\n                    }\n                }\n            ';
                _this17.app.getAdaptor().mutate(mutationString, {
                    id: id, item_id: item_id
                }).then(function (result) {
                    resolve(result.removeFavouriteItemForCustomer._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return CustomerController;
}();

module.exports = CustomerController;