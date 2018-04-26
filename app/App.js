/**
 * The central controller
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const ModelObserver = require('./observers/ModelObserver');

const Verify = require('./models/Verify');

const GraphController = require('./controllers/GraphController');
const CustomerController = require('./controllers/CustomerController');
const VendorController = require('./controllers/VendorController');
const OrderController = require('./controllers/OrderController');
const NotificationController = require('./controllers/NotificationController');

const CheaprEatsApolloAdaptor = require('./adaptors/CheaprEatsApolloAdaptor');

const config = {
    endpoints: require('../config/endpoints')
};

class App {
    constructor(){
        this._modelObserver = new ModelObserver();

        this._adaptorMode = 'production';
        this._token = null;

        this._adaptor = new CheaprEatsApolloAdaptor({
            apolloEndpoint: this.getConfiguration().endpoints.apolloEndpoint.production
        });

        this.Verify = new Verify({
            getVerificationCodeEndpoint: this.getConfiguration().endpoints.verificationEndpoint.production
        });

        this._graphController = new GraphController(this._adaptor);
        this._customerController = new CustomerController(this);
        this._vendorController = new VendorController(this);
        this._orderController = new OrderController(this);
        this._notificationController = new NotificationController(this);

        this.Graph = {
            query: this._graphController.query
        };

        this.Customer = {
            create: this._customerController.create,
            authenticate: this._customerController.authenticate,
            addCreditCard: this._customerController.addCreditCard
        };

        this.Vendor = {
            authenticate: this._vendorController.authenticate
        };

        this.Order = {
            create: this._orderController.create
        };

        this.Notification = {
            apnsEnrollCustomer: this._notificationController.apnsEnrollCustomer,
            apnsRevokeCustomer: this._notificationController.apnsRevokeCustomer
        };

    }

    switchAdaptorMode(mode){
        // TODO: Change REST to adaptor
        if(mode === 'production'){
            this._adaptor.setApolloEndpoint(this.getConfiguration().endpoints.apolloEndpoint.production);
            this.Verify = new Verify({
                getVerificationCodeEndpoint: this.getConfiguration().endpoints.verificationEndpoint.production
            });
        } else {
            this._adaptor.setApolloEndpoint(this.getConfiguration().endpoints.apolloEndpoint.qa);
            this.Verify = new Verify({
                getVerificationCodeEndpoint: this.getConfiguration().endpoints.verificationEndpoint.qa
            });
        }
        this._adaptorMode = mode;
    }

    getAdaptorMode(){
        return this._adaptorMode;
    }

    /**
     * Get current network adaptor instance
     * @returns {CheaprEatsApolloAdaptor}
     */
    getAdaptor() {
        return this._adaptor;
    }

    getConfiguration(){
        return config;
    }

    /**
     * Set current authentication token
     * @param token
     */
    setAuthenticationToken(token){
        this._token = token;
        this._adaptor.setAuthenticationToken(token);
    }

    /**
     * Get current authentication token
     * @returns {null|string}
     */
    getAuthenticationToken(){
        return this._token;
    }

    /**
     * Get the ModelObserver instance
     * @returns {ModelObserver}
     */
    getModelObserver(){
        return this._modelObserver;
    }
}

module.exports = App;
