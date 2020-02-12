"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var strToIdentifier = require("./util/strToIdentifier");
var CheaprEatsGraphQLAdaptor = require("./adaptors/CheaprEatsGraphQLAdaptor");
var packageDotJson = require("../../package.json");
// ADD CONTROLLER IMPORTS BELOW
var AuthorizationController = require("./controllers/AuthorizationController");
var CartController = require("./controllers/CartController");
var CategoryController = require("./controllers/CategoryController");
var CustomerController = require("./controllers/CustomerController");
var CustomerTokenController = require("./controllers/CustomerTokenController");
var CouponController = require("./controllers/CouponController");
var EmployeeController = require("./controllers/EmployeeController");
var EmployeeTokenController = require("./controllers/EmployeeTokenController");
var GraphController = require("./controllers/GraphController");
var HeadOfficeController = require("./controllers/HeadOfficeController");
var MenuItemController = require("./controllers/MenuItemController");
var ModifierController = require("./controllers/ModifierController");
var VendorController = require("./controllers/VendorController");
var VerificationController = require("./controllers/VerificationController");
var ValidationController = require("./controllers/ValidationController");
var SurveyController = require("./controllers/SurveyController");
var OrderController = require("./controllers/OrderController");
var ImageController = require("./controllers/ImageController");
var PayoutController = require("./controllers/PayoutController");
var ExplorePageController = require("./controllers/ExplorePageController");
var FlashSaleController = require("./controllers/FlashSaleController");
var TipController = require("./controllers/TipController");
var LoyaltyProgramController = require("./controllers/LoyaltyProgramController");
var LoyaltyCardController = require("./controllers/LoyaltyCardController");
var RedeemableItemController = require("./controllers/RedeemableItemController");
var RemoteConfigurationController = require("./controllers/RemoteConfigurationController");
var config = {
    endpoints: require("../config/endpoints")
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
        // ADD CONTROLLERS BELOW
        this._authorizationController = new AuthorizationController(this);
        this._cartController = new CartController(this);
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
        this._explorePageController = new ExplorePageController(this);
        this._flashSaleController = new FlashSaleController(this);
        this._tipController = new TipController(this);
        this._loyaltyProgramController = new LoyaltyProgramController(this);
        this._loyaltyCardController = new LoyaltyCardController(this);
        this._redeemableItemController = new RedeemableItemController(this);
        this._remoteConfigurationController = new RemoteConfigurationController(this);
    }
    // ADD GETTERS BELOW


    _createClass(App, [{
        key: "getAdaptor",

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
        key: "getConfiguration",
        value: function getConfiguration() {
            return config;
        }
        /**
         * Set current authentication token
         * @param token
         */

    }, {
        key: "setAuthenticationToken",
        value: function setAuthenticationToken(token) {
            this._token = token;
            this._adaptor.setAuthenticationToken(token);
        }
        /**
         * Get current authentication token
         * @returns {null|string}
         */

    }, {
        key: "getAuthenticationToken",
        value: function getAuthenticationToken() {
            return this._token;
        }
        /**
         * Determine if current SDK Version in compatible
         * @returns {null|boolean}
         */

    }, {
        key: "isCompatible",
        value: function isCompatible() {
            var _this = this;

            var sdkVersion = packageDotJson.version;
            var queryString = "\n            query {\n                is_sdk_version_supported(version:\"" + sdkVersion + "\")\n            }\n        ";
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
        key: "setApolloEndpoint",
        value: function setApolloEndpoint(endpoint) {
            this.setGraphQLEndpoint(endpoint);
        }
        /**
         * Set GraphQL endpoint.
         * @param endpoint
         */

    }, {
        key: "setGraphQLEndpoint",
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
        key: "setVerificationEndpoint",
        value: function setVerificationEndpoint(endpoint) {
            config.endpoints.verificationEndpoint.production = endpoint;
        }
        /**
         * Set validationEndpoint.production
         * @param endpoint
         */

    }, {
        key: "setValidationEndpoint",
        value: function setValidationEndpoint(endpoint) {
            config.endpoints.validationEndpoint.production = endpoint;
        }
        /**
         * Set imageEndpoint.production
         * @param endpoint
         */

    }, {
        key: "setImageEndpoint",
        value: function setImageEndpoint(endpoint) {
            config.endpoints.imageEndpoint.production = endpoint;
        }
        /**
         * Set imageEndpoint.distribution
         * @param endpoint
         */

    }, {
        key: "setImageDistributionEndpoint",
        value: function setImageDistributionEndpoint(endpoint) {
            config.endpoints.imageEndpoint.distribution = endpoint;
        }
    }, {
        key: "Authorization",
        get: function get() {
            return {
                getTokenScope: this._authorizationController.getTokenScope
            };
        }
    }, {
        key: "Cart",
        get: function get() {
            return {
                updateNote: this._cartController.updateNote,
                removeCoupon: this._cartController.removeCoupon,
                applyCoupon: this._cartController.applyCoupon,
                delete: this._cartController.delete,
                removeItem: this._cartController.removeItem,
                addItem: this._cartController.addItem,
                create: this._cartController.create
            };
        }
        /**
         * Get category related methods.
         * @returns {{create: CategoryController.create, delete: CategoryController.delete, update: CategoryController.update, batchUpdate: CategoryController.batchUpdate}}
         */

    }, {
        key: "Category",
        get: function get() {
            return {
                create: this._categoryController.create,
                delete: this._categoryController.delete,
                update: this._categoryController.update,
                batchUpdate: this._categoryController.batchUpdate
            };
        }
        /**
         * Get customer related methods.
         * @returns {{create: CustomerController.create, enrollApnsToken: CustomerController.enrollApnsToken, revokeApnsToken: CustomerController.revokeApnsToken, enrollFcmToken: CustomerController.enrollFcmToken, revokeFcmToken: CustomerController.revokeFcmToken, update: CustomerController.update, updateCreditCard: CustomerController.updateCreditCard, createWallet: CustomerController.createWallet, reloadWallet: CustomerController.reloadWallet, resetPassword: CustomerController.resetPassword, sendPasswordResetCode: CustomerController.sendPasswordResetCode, refundWallet: CustomerController.refundWallet, createWalletTransaction:CustomerController.createWalletTransaction, addFavouriteVendor:CustomerController.addFavouriteVendor, removeFavouriteVendor:CustomerController.removeFavouriteVendor, addFavouriteItem:CustomerController.addFavouriteItem, removeFavouriteItem:CustomerController.removeFavouriteItem}}
         */

    }, {
        key: "Customer",
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
                createWalletTransaction: this._customerController.createWalletTransaction,
                addFavouriteVendor: this._customerController.addFavouriteVendor,
                removeFavouriteVendor: this._customerController.removeFavouriteVendor,
                addFavouriteItem: this._customerController.addFavouriteItem,
                removeFavouriteItem: this._customerController.removeFavouriteItem
            };
        }
        /**
         * Get customer token related methods.
         * @returns {{create: CustomerTokenController.create}}
         */

    }, {
        key: "CustomerToken",
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
        key: "Coupon",
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
        key: "Employee",
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
        key: "EmployeeToken",
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
        key: "Graph",
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
        key: "MenuItem",
        get: function get() {
            return {
                create: this._menuItemController.create,
                update: this._menuItemController.update,
                batchUpdate: this._menuItemController.batchUpdate,
                delete: this._menuItemController.delete
            };
        }
        /**
         * Get modifier related methods.
         * @returns {{create: ModifierController.create, update: ModifierController.update, delete: ModifierController.delete}}
         */

    }, {
        key: "Modifier",
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
        key: "Order",
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
        key: "HeadOffice",
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
        key: "Verification",
        get: function get() {
            return {
                startVerificationSession: this._verificationController.startVerificationSession,
                checkVerificationSession: this._verificationController.checkVerificationSession
            };
        }
        /**
         * Get vendor related methods.
         * @returns {{create: VendorController.create, createWithEmployee: VendorController.createWithEmployee, update: VendorController.update, updateAllMenuItemsStatus: VendorController.updateAllMenuItemsStatus, deleteVendorTester: VendorController.deleteVendorTester, addVendorTesterByEmailAddress: VendorController.addVendorTesterByEmailAddress, updateVendorApprovalStatus: VendorController.updateVendorApprovalStatus, requestVendorApproval: VendorController.requestVendorApproval}}
         */

    }, {
        key: "Vendor",
        get: function get() {
            return {
                create: this._vendorController.create,
                createWithEmployee: this._vendorController.createWithEmployee,
                update: this._vendorController.update,
                updateAllMenuItemsStatus: this._vendorController.updateAllMenuItemsStatus,
                deleteVendorTester: this._vendorController.deleteVendorTester,
                addVendorTesterByEmailAddress: this._vendorController.addVendorTesterByEmailAddress,
                updateVendorApprovalStatus: this._vendorController.updateVendorApprovalStatus,
                requestVendorApproval: this._vendorController.requestVendorApproval
            };
        }
        /**
         * Get validation services methods.
         * @returns {{Customer: {signupEmail: ValidationController.customerSignupEmail, signupPhone: ValidationController.customerSignupPhone}}}
         */

    }, {
        key: "Validation",
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
         * @returns {{create: SurveyController.create, update: SurveyController.update, archive: SurveyController.archive, delete: SurveyController.delete, release: SurveyController.release, createSurveyResponse: SurveyController.createSurveyResponse}}
         */

    }, {
        key: "Survey",
        get: function get() {
            return {
                create: this._surveyController.create,
                update: this._surveyController.update,
                archive: this._surveyController.archive,
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
        key: "Image",
        get: function get() {
            return {
                upload: this._imageController.upload,
                getLink: this._imageController.getLink
            };
        }
        /**
         * Get payout methods.
         * @returns {{request: PayoutController.request, update: PayoutController.update, cancel: PayoutController.cancel, }}
         * @constructor
         */

    }, {
        key: "Payout",
        get: function get() {
            return {
                request: this._payoutController.request,
                update: this._payoutController.update,
                cancel: this._payoutController.cancel
            };
        }
        /**
         * Get explore page methods.
         * @returns {{replace: ExplorePageController.replace}}
         * @constructor
         */

    }, {
        key: "ExplorePage",
        get: function get() {
            return {
                replace: this._explorePageController.replace
            };
        }
        /**
         * Get flash sale methods.
         * @returns {{create: FlashSaleController.create, update: FlashSaleController.update}}
         * @constructor
         */

    }, {
        key: "FlashSale",
        get: function get() {
            return {
                create: this._flashSaleController.create,
                update: this._flashSaleController.update
            };
        }
        /**
         * Get tip methods.
         * @returns {{create: TipController.create}}
         * @constructor
         */

    }, {
        key: "Tip",
        get: function get() {
            return {
                create: this._tipController.create
            };
        }
        /**
         * Get loyalty program methods.
         * @returns {{create: LoyaltyProgramController.create, update: LoyaltyProgramController.update, delete: LoyaltyProgramController.delete}}
         * @constructor
         */

    }, {
        key: "LoyaltyProgram",
        get: function get() {
            return {
                create: this._loyaltyProgramController.create,
                update: this._loyaltyProgramController.update,
                delete: this._loyaltyProgramController.delete
            };
        }
        /**
         * Get loyalty card methods.
         * @returns {{createLoyaltyCardAndEnroll: LoyaltyCardController.createLoyaltyCardAndEnroll, awardPointsToLoyaltyCard: LoyaltyCardController.awardPointsToLoyaltyCard, awardShareablePointsToLoyaltyCard: LoyaltyCardController.awardShareablePointsToLoyaltyCard, shareLoyaltyPoints: LoyaltyCardController.shareLoyaltyPoints, redeemLoyaltyPointsForCoupon: LoyaltyCardController.redeemLoyaltyPointsForCoupon}}
         * @constructor
         */

    }, {
        key: "LoyaltyCard",
        get: function get() {
            return {
                createLoyaltyCardAndEnroll: this._loyaltyCardController.createLoyaltyCardAndEnroll,
                awardPointsToLoyaltyCard: this._loyaltyCardController.awardPointsToLoyaltyCard,
                awardShareablePointsToLoyaltyCard: this._loyaltyCardController.awardShareablePointsToLoyaltyCard,
                shareLoyaltyPoints: this._loyaltyCardController.shareLoyaltyPoints,
                redeemLoyaltyPointsForCoupon: this._loyaltyCardController.redeemLoyaltyPointsForCoupon
            };
        }
        /**
         * Get redeemable item methods.
         * @returns {{create: RedeemableItemController.create, update: RedeemableItemController.update, delete: RedeemableItemController.delete}}
         * @constructor
         */

    }, {
        key: "RedeemableItem",
        get: function get() {
            return {
                create: this._redeemableItemController.create,
                update: this._redeemableItemController.update,
                delete: this._redeemableItemController.delete
            };
        }
    }, {
        key: "RemoteConfiguration",
        get: function get() {
            return {
                fetch: this._remoteConfigurationController.fetch,
                deleteRawConfiguration: this._remoteConfigurationController.deleteRawConfiguration,
                updateRawConfiguration: this._remoteConfigurationController.updateRawConfiguration,
                createRawConfiguration: this._remoteConfigurationController.createRawConfiguration
            };
        }
        /**
         * Get utility methods.
         * @returns {{strToIdentifier: (*|(function(): result))}}
         */

    }, {
        key: "Util",
        get: function get() {
            return {
                strToIdentifier: strToIdentifier
            };
        }
    }]);

    return App;
}();

module.exports = App;