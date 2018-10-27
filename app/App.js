/**
 * The central controller
 * Author: Jun Zheng
 * Contributors: Mohammad Ismail
 * License: UNLICENSED
 */

const CategoryController = require('./controllers/CategoryController');
const CustomerController = require('./controllers/CustomerController');
const CustomerTokenController = require('./controllers/CustomerTokenController');
const CouponController = require('./controllers/CouponController');
const EmployeeController = require('./controllers/EmployeeController');
const EmployeeTokenController = require('./controllers/EmployeeTokenController');
const GraphController = require('./controllers/GraphController');
const HeadOfficeController = require('./controllers/HeadOfficeController');
const MenuItemController = require('./controllers/MenuItemController');
const ModifierController = require('./controllers/ModifierController');
const VendorController = require('./controllers/VendorController');
const VerificationController = require('./controllers/VerificationController');
const ValidationController = require('./controllers/ValidationController');
const OrderController = require('./controllers/OrderController');
const ImageController = require('./controllers/ImageController');
const strToIdentifier =  require('./util/strToIdentifier');

const CheaprEatsApolloAdaptor = require('./adaptors/CheaprEatsApolloAdaptor');

let config = {
    endpoints: require('../config/endpoints')
};

class App {
    constructor() {
        this._token = null;

        this._adaptor = new CheaprEatsApolloAdaptor({
            apolloEndpoint: this.getConfiguration().endpoints.apolloEndpoint.production
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
        this._orderController = new OrderController(this);
        this._imageController = new ImageController(this);

        this.Category = {
            create: this._categoryController.create,
            delete: this._categoryController.delete,
            update: this._categoryController.update
        };

        this.Customer = {
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
            sendPasswordResetCode: this._customerController.sendPasswordResetCode
        };

        this.CustomerToken = {
            create: this._customerTokenController.create
        };

        this.Coupon = {
            create: this._couponController.create
        };

        this.Employee = {
            create: this._employeeController.create,
            update: this._employeeController.update,
            delete: this._employeeController.delete,
            enrollTerminalFcm: this._employeeController.enrollTerminalFcm,
            revokeTerminalFcm: this._employeeController.revokeTerminalFcm
        };

        this.EmployeeToken = {
            create: this._employeeTokenController.create
        };

        this.Graph = {
            query: this._graphController.query
        };

        this.MenuItem = {
            create: this._menuItemController.create,
            update: this._menuItemController.update,
            delete: this._menuItemController.delete
        };

        this.Modifier = {
            create: this._modifierController.create,
            update: this._modifierController.update,
            delete: this._modifierController.delete
        };

        this.Order = {
            create: this._orderController.create,
            cancel: this._orderController.cancel,
            beginPreparing: this._orderController.beginPreparing,
            prepared: this._orderController.prepared,
            complete: this._orderController.complete
        };

        this.HeadOffice = {
            create: this._headOfficeController.create,
            update: this._headOfficeController.update,
            delete: this._headOfficeController.delete
        };

        this.Vendor = {
            create: this._vendorController.create,
            createWithEmployee: this._vendorController.createWithEmployee,
            update: this._vendorController.update
        };

        this.Verification = {
            sendSms: this._verificationController.sendSms,
            checkSms: this._verificationController.checkSms
        };

        this.Validation = {
            Customer: {
                signupEmail: this._validationController.customerSignupEmail,
                signupPhone: this._validationController.customerSignupPhone
            }
        };

        this.Image = {
            upload: this._imageController.upload,
            getLink: this._imageController.getLink
        };

        this.Util = {
            strToIdentifier: strToIdentifier
        };

    }

    /**
     * Get current network adaptor instance
     * @returns {CheaprEatsApolloAdaptor}
     */
    getAdaptor() {
        return this._adaptor;
    }

    /**
     * Get Configuration
     * @returns {{endpoints: ({apolloEndpoint: {production: string}, verificationEndpoint: {production: string}, validationEndpoint: {production: string}, imageEndpoint: {production: string, distribution: string}}|{apolloEndpoint, verificationEndpoint, validationEndpoint, imageEndpoint})}}
     */
    getConfiguration() {
        return config;
    }

    /**
     * Set current authentication token
     * @param token
     */
    setAuthenticationToken(token) {
        this._token = token;
        this._adaptor.setAuthenticationToken(token);
    }

    /**
     * Get current authentication token
     * @returns {null|string}
     */
    getAuthenticationToken() {
        return this._token;
    }

    /**
     * Set apolloEndpoint.production
     * @param endpoint
     */
    setApolloEndpoint(endpoint) {
        config.endpoints.apolloEndpoint.production = endpoint;
        this._adaptor = new CheaprEatsApolloAdaptor({
            apolloEndpoint: this.getConfiguration().endpoints.apolloEndpoint.production
        });
    }

    /**
     * Set verificationEndpoint.production
     * @param endpoint
     */
    setVerificationEndpoint(endpoint) {
        config.endpoints.verificationEndpoint.production = endpoint;
    }

    /**
     * Set validationEndpoint.production
     * @param endpoint
     */
    setValidationEndpoint(endpoint) {
        config.endpoints.validationEndpoint.production = endpoint;
    }

    /**
     * Set imageEndpoint.production
     * @param endpoint
     */
    setImageEndpoint(endpoint) {
        config.endpoints.imageEndpoint.production = endpoint;
    }

    /**
     * Set imageEndpoint.distribution
     * @param endpoint
     */
    setImageDistributionEndpoint(endpoint) {
        config.endpoints.imageEndpoint.distribution = endpoint;
    }


}

module.exports = App;
