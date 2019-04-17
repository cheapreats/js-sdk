'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CategoryController = require('./controllers/CategoryController');
var CustomerController = require('./controllers/CustomerController');
var CustomerTokenController = require('./controllers/CustomerTokenController');
var CouponController = require('./controllers/CouponController');
var EmployeeController = require('./controllers/EmployeeController');
var EmployeeTokenController = require('./controllers/EmployeeTokenController');
var GraphController = require('./controllers/GraphController');
var HeadOfficeController = require('./controllers/HeadOfficeController');
var MenuItemController = require('./controllers/MenuItemController');
var ModifierController = require('./controllers/ModifierController');
var VendorController = require('./controllers/VendorController');
var VerificationController = require('./controllers/VerificationController');
var ValidationController = require('./controllers/ValidationController');
var SurveyController = require('./controllers/SurveyController');
var OrderController = require('./controllers/OrderController');
var ImageController = require('./controllers/ImageController');
var PayoutController = require('./controllers/PayoutController');
var strToIdentifier = require('./util/strToIdentifier');
var packageDotJson = require('../../package.json');

var CheaprEatsGraphQLAdaptor = require('./adaptors/CheaprEatsGraphQLAdaptor');

var config = {
    endpoints: require('../config/endpoints')
};

/**
 * Main entry point of the SDK
 */

var App = function () {

    /**
     * Construct the App instance.
     * @hideconstructor
     */
    function App() {
        _classCallCheck(this, App);

        this._token = null;

        this._adaptor = new CheaprEatsGraphQLAdaptor({
            graphQLEndpoint: this.getConfiguration().endpoints.graphQLEndpoint.production
        });

        this._categoryController = new CategoryController(this);
        this._customerController = new CustomerController(this);
        this._customerTokenController = new CustomerTokenController(this);
        this._couponController = new CouponController(this);
        this._employeeController = new EmployeeController(this);
        this._employeeTokenController = new EmployeeTokenController(this);
        this._graphController = new GraphController(this);
        this._headOfficeController = new HeadOfficeController(this);
        this._menuItemController = new MenuItemController(this);
        this._modifierController = new ModifierController(this);
        this._vendorController = new VendorController(this);
        this._verificationController = new VerificationController(this);
        this._validationController = new ValidationController(this);
        this._surveyController = new SurveyController(this);
        this._orderController = new OrderController(this);
        this._imageController = new ImageController(this);
        this._payoutController = new PayoutController(this);
    }

    /**
     * Get category related methods.
     * @returns {{create: CategoryController.create, delete: CategoryController.delete, update: CategoryController.update}}
     */


    _createClass(App, [{
        key: 'getAdaptor',


        /**
         * Get current network adaptor instance
         * @returns {CheaprEatsGraphQLAdaptor}
         */
        value: function getAdaptor() {
            return this._adaptor;
        }

        /**
         * Get Configuration
         * @returns {{endpoints: ({graphQLEndpoint: {production: string}, verificationEndpoint: {production: string}, validationEndpoint: {production: string}, imageEndpoint: {production: string, distribution: string}}|{graphQLEndpoint, verificationEndpoint, validationEndpoint, imageEndpoint})}}
         */

    }, {
        key: 'getConfiguration',
        value: function getConfiguration() {
            return config;
        }

        /**
         * Set current authentication token
         * @param token
         */

    }, {
        key: 'setAuthenticationToken',
        value: function setAuthenticationToken(token) {
            this._token = token;
            this._adaptor.setAuthenticationToken(token);
        }

        /**
         * Get current authentication token
         * @returns {null|string}
         */

    }, {
        key: 'getAuthenticationToken',
        value: function getAuthenticationToken() {
            return this._token;
        }

        /**
         * Determine if current SDK Version in compatible
         * @returns {null|boolean}
         */

    }, {
        key: 'isCompatible',
        value: function isCompatible() {
            var _this = this;

            var sdkVersion = packageDotJson.version;
            var queryString = '\n            query {\n                is_sdk_version_supported(version:"' + sdkVersion + '")\n            }\n        ';
            return new Promise(function (resolve, reject) {
                _this.Graph.query(queryString).then(function (data) {
                    resolve(data.is_sdk_version_supported);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Set Apollo endpoint.
         * WARNING: END OF LIFE
         * Please use setGraphQLEndpointInstead
         * @deprecated
         * @param endpoint
         */

    }, {
        key: 'setApolloEndpoint',
        value: function setApolloEndpoint(endpoint) {
            this.setGraphQLEndpoint(endpoint);
        }

        /**
         * Set GraphQL endpoint.
         * @param endpoint
         */

    }, {
        key: 'setGraphQLEndpoint',
        value: function setGraphQLEndpoint(endpoint) {
            config.endpoints.graphQLEndpoint.production = endpoint;
            this._adaptor = new CheaprEatsGraphQLAdaptor({
                graphQLEndpoint: this.getConfiguration().endpoints.graphQLEndpoint.production
            });
        }

        /**
         * Set verificationEndpoint.production
         * @param endpoint
         */

    }, {
        key: 'setVerificationEndpoint',
        value: function setVerificationEndpoint(endpoint) {
            config.endpoints.verificationEndpoint.production = endpoint;
        }

        /**
         * Set validationEndpoint.production
         * @param endpoint
         */

    }, {
        key: 'setValidationEndpoint',
        value: function setValidationEndpoint(endpoint) {
            config.endpoints.validationEndpoint.production = endpoint;
        }

        /**
         * Set imageEndpoint.production
         * @param endpoint
         */

    }, {
        key: 'setImageEndpoint',
        value: function setImageEndpoint(endpoint) {
            config.endpoints.imageEndpoint.production = endpoint;
        }

        /**
         * Set imageEndpoint.distribution
         * @param endpoint
         */

    }, {
        key: 'setImageDistributionEndpoint',
        value: function setImageDistributionEndpoint(endpoint) {
            config.endpoints.imageEndpoint.distribution = endpoint;
        }
    }, {
        key: 'Category',
        get: function get() {
            return {
                create: this._categoryController.create,
                delete: this._categoryController.delete,
                update: this._categoryController.update
            };
        }

        /**
         * Get customer related methods.
         * @returns {{create: CustomerController.create, enrollApnsToken: CustomerController.enrollApnsToken, revokeApnsToken: CustomerController.revokeApnsToken, enrollFcmToken: CustomerController.enrollFcmToken, revokeFcmToken: CustomerController.revokeFcmToken, update: CustomerController.update, updateCreditCard: CustomerController.updateCreditCard, createWallet: CustomerController.createWallet, reloadWallet: CustomerController.reloadWallet, resetPassword: CustomerController.resetPassword, sendPasswordResetCode: CustomerController.sendPasswordResetCode, refundWallet: CustomerController.refundWallet, createWalletTransaction:CustomerController.createWalletTransaction}}
         */

    }, {
        key: 'Customer',
        get: function get() {
            return {
                create: this._customerController.create,
                enrollApnsToken: this._customerController.enrollApnsToken,
                revokeApnsToken: this._customerController.revokeApnsToken,
                enrollFcmToken: this._customerController.enrollFcmToken,
                revokeFcmToken: this._customerController.revokeFcmToken,
                update: this._customerController.update,
                updateCreditCard: this._customerController.updateCreditCard,
                createWallet: this._customerController.createWallet,
                reloadWallet: this._customerController.reloadWallet,
                resetPassword: this._customerController.resetPassword,
                sendPasswordResetCode: this._customerController.sendPasswordResetCode,
                refundWallet: this._customerController.refundWallet,
                createWalletTransaction: this._customerController.createWalletTransaction
            };
        }

        /**
         * Get customer token related methods.
         * @returns {{create: CustomerTokenController.create}}
         */

    }, {
        key: 'CustomerToken',
        get: function get() {
            return {
                create: this._customerTokenController.create
            };
        }

        /**
         * Get coupon related methods.
         * @returns {{create: CouponController.create}}
         */

    }, {
        key: 'Coupon',
        get: function get() {
            return {
                create: this._couponController.create
            };
        }

        /**
         * Get employee related methods.
         * @returns {{create: EmployeeController.create, update: EmployeeController.update, delete: EmployeeController.delete, enrollTerminalFcm: EmployeeController.enrollTerminalFcm, revokeTerminalFcm: EmployeeController.revokeTerminalFcm, sendPasswordResetCode: EmployeeController.sendPasswordResetCode}}
         */

    }, {
        key: 'Employee',
        get: function get() {
            return {
                create: this._employeeController.create,
                update: this._employeeController.update,
                delete: this._employeeController.delete,
                enrollTerminalFcm: this._employeeController.enrollTerminalFcm,
                revokeTerminalFcm: this._employeeController.revokeTerminalFcm,
                resetEmployeePassword: this._employeeController.resetEmployeePassword,
                sendPasswordResetCode: this._employeeController.sendPasswordResetCode
            };
        }

        /**
         * Get employee token related methods.
         * @returns {{create: EmployeeTokenController.create}}
         */

    }, {
        key: 'EmployeeToken',
        get: function get() {
            return {
                create: this._employeeTokenController.create
            };
        }

        /**
         * Get graph related methods.
         * @returns {{query: GraphController.query}}
         */

    }, {
        key: 'Graph',
        get: function get() {
            return {
                query: this._graphController.query
            };
        }

        /**
         * Get menu item related methods.
         * @returns {{create: MenuItemController.create, update: MenuItemController.update, delete: MenuItemController.delete}}
         */

    }, {
        key: 'MenuItem',
        get: function get() {
            return {
                create: this._menuItemController.create,
                update: this._menuItemController.update,
                delete: this._menuItemController.delete
            };
        }

        /**
         * Get modifier related methods.
         * @returns {{create: ModifierController.create, update: ModifierController.update, delete: ModifierController.delete}}
         */

    }, {
        key: 'Modifier',
        get: function get() {
            return {
                create: this._modifierController.create,
                update: this._modifierController.update,
                delete: this._modifierController.delete
            };
        }

        /**
         * Get order related methods.
         * @returns {{create: OrderController.create, cancel: OrderController.cancel, beginPreparing: OrderController.beginPreparing, prepared: OrderController.prepared, complete: OrderController.complete}}
         */

    }, {
        key: 'Order',
        get: function get() {
            return {
                create: this._orderController.create,
                cancel: this._orderController.cancel,
                beginPreparing: this._orderController.beginPreparing,
                prepared: this._orderController.prepared,
                complete: this._orderController.complete
            };
        }

        /**
         * Get head office related methods.
         * @returns {{create: HeadOfficeController.create, update: HeadOfficeController.update, delete: HeadOfficeController.delete}}
         */

    }, {
        key: 'HeadOffice',
        get: function get() {
            return {
                create: this._headOfficeController.create,
                update: this._headOfficeController.update,
                delete: this._headOfficeController.delete
            };
        }

        /**
         * Get verification services methods.
         * @returns {{startVerificationSession: VerificationController.startVerificationSession, checkVerificationSession: VerificationController.checkVerificationSession}}
         */

    }, {
        key: 'Verification',
        get: function get() {
            return {
                startVerificationSession: this._verificationController.startVerificationSession,
                checkVerificationSession: this._verificationController.checkVerificationSession
            };
        }

        /**
         * Get vendor related methods.
         * @returns {{create: VendorController.create, createWithEmployee: VendorController.createWithEmployee, update: VendorController.update}}
         */

    }, {
        key: 'Vendor',
        get: function get() {
            return {
                create: this._vendorController.create,
                createWithEmployee: this._vendorController.createWithEmployee,
                update: this._vendorController.update,
                updateAllMenuItemsStatus: this._vendorController.updateAllMenuItemsStatus
            };
        }

        /**
         * Get validation services methods.
         * @returns {{Customer: {signupEmail: ValidationController.customerSignupEmail, signupPhone: ValidationController.customerSignupPhone}}}
         */

    }, {
        key: 'Validation',
        get: function get() {
            return {
                Customer: {
                    signupEmail: this._validationController.customerSignupEmail,
                    signupPhone: this._validationController.customerSignupPhone
                }
            };
        }

        /**
         * Get survey related methods
         */

    }, {
        key: 'Survey',
        get: function get() {
            return {
                create: this._surveyController.create,
                update: this._surveyController.update,
                delete: this._surveyController.delete,
                release: this._surveyController.release,
                createSurveyResponse: this._surveyController.createSurveyResponse
            };
        }

        /**
         * Get image services methods.
         * @returns {{upload: ImageController.upload, getLink: ImageController.getLink}}
         */

    }, {
        key: 'Image',
        get: function get() {
            return {
                upload: this._imageController.upload,
                getLink: this._imageController.getLink
            };
        }

        /**
         * Get utility methods.
         * @returns {{strToIdentifier: (*|(function(): result))}}
         */

    }, {
        key: 'Util',
        get: function get() {
            return {
                strToIdentifier: strToIdentifier
            };
        }

        /**
         * Get payout methods.
         * @returns {{request: PayoutController.request}}
         * @constructor
         */

    }, {
        key: 'Payout',
        get: function get() {
            return {
                request: this._payoutController.request,
                update: this._payoutController.update,
                cancel: this._payoutController.cancel
            };
        }
    }]);

    return App;
}();

module.exports = App;