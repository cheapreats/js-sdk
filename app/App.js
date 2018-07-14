/**
 * The central controller
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const ModelObserver = require('./observers/ModelObserver');

const CategoryController = require('./controllers/CategoryController');
const CustomerController = require('./controllers/CustomerController');
const CustomerTokenController = require('./controllers/CustomerTokenController');
const EmployeeController = require('./controllers/EmployeeController');
const EmployeeTokenController = require('./controllers/EmployeeTokenController');
const GraphController = require('./controllers/GraphController');
const HeadOfficeController = require('./controllers/HeadOfficeController');
const VendorController = require('./controllers/VendorController');
const VerificationController = require('./controllers/VerificationController');
const ValidationController = require('./controllers/ValidationController');
const OrderController = require('./controllers/OrderController');
const ImageController = require('./controllers/ImageController');


const CheaprEatsApolloAdaptor = require('./adaptors/CheaprEatsApolloAdaptor');

const config = {
    endpoints: require('../config/endpoints')
};

class App {
    constructor() {
        this._modelObserver = new ModelObserver();

        this._adaptorMode = 'production';
        this._token = null;

        this._adaptor = new CheaprEatsApolloAdaptor({
            apolloEndpoint: this.getConfiguration().endpoints.apolloEndpoint.production
        });

        this._categoryController = new CategoryController(this);
        this._customerController = new CustomerController(this);
        this._customerTokenController = new CustomerTokenController(this);
        this._employeeController = new EmployeeController(this);
        this._employeeTokenController = new EmployeeTokenController(this);
        this._graphController = new GraphController(this._adaptor);
        this._headOfficeController = new HeadOfficeController(this);
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
            update: this._customerController.update,
            updateCreditCard: this._customerController.updateCreditCard
        };

        this.CustomerToken = {
            create: this._customerTokenController.create
        };

        this.Employee = {
            create: this._employeeController.create,
            update: this._employeeController.update,
            delete: this._employeeController.delete
        };

        this.EmployeeToken = {
            create: this._employeeTokenController.create
        };

        this.Graph = {
            query: this._graphController.query
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

    }

    switchAdaptorMode(mode) {
        // TODO: Change REST to adaptor
        if (mode === 'production') {
            this._adaptor.setApolloEndpoint(this.getConfiguration().endpoints.apolloEndpoint.production);
        } else {
            this._adaptor.setApolloEndpoint(this.getConfiguration().endpoints.apolloEndpoint.qa);
        }
        this._adaptorMode = mode;
    }

    getAdaptorMode() {
        return this._adaptorMode;
    }

    /**
     * Get current network adaptor instance
     * @returns {CheaprEatsApolloAdaptor}
     */
    getAdaptor() {
        return this._adaptor;
    }

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
     * Get the ModelObserver instance
     * @returns {ModelObserver}
     */
    getModelObserver() {
        return this._modelObserver;
    }
}

module.exports = App;
