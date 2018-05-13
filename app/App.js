/**
 * The central controller
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const ModelObserver = require('./observers/ModelObserver');

const GraphController = require('./controllers/GraphController');
const CustomerController = require('./controllers/CustomerController');
const VendorController = require('./controllers/VendorController');
const OrderController = require('./controllers/OrderController');
const NotificationController = require('./controllers/NotificationController');
const TwilioController = require('./controllers/TwilioController');
const MenuItemController = require('./controllers/MenuItemController');
const ToppingItemController = require('./controllers/ToppingItemController');
const ComboItemController = require('./controllers/ComboItemController');

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

        this._graphController = new GraphController(this._adaptor);
        this._customerController = new CustomerController(this);
        this._vendorController = new VendorController(this);
        this._orderController = new OrderController(this);
        this._notificationController = new NotificationController(this);
        this._twilioController = new TwilioController(this);
        this._menuItemController = new MenuItemController(this);
        this._toppingItemController = new ToppingItemController(this);
        this._comboItemController = new ComboItemController(this);

        this.Verify = {
            getCode: this._twilioController.getCode,
            canVerify: this._twilioController.canVerify
        };

        this.Graph = {
            query: this._graphController.query
        };

        this.Customer = {
            create: this._customerController.create,
            authenticate: this._customerController.authenticate,
            addCreditCard: this._customerController.addCreditCard,
            updateCreditCard: this._customerController.updateCreditCard
        };

        this.Vendor = {
            authenticate: this._vendorController.authenticate,
            create: this._vendorController.create
        };

        this.Order = {
            create: this._orderController.create,
            cancel: this._orderController.cancel
        };

        this.Notification = {
            apnsEnrollCustomer: this._notificationController.apnsEnrollCustomer,
            apnsRevokeCustomer: this._notificationController.apnsRevokeCustomer
        };

        this.MenuItem = {
            add: this._menuItemController.add,
            update: this._menuItemController.update,
            delete: this._menuItemController.delete
        };

        this.ToppingItem = {
            add: this._toppingItemController.add,
            update: this._toppingItemController.update,
            delete: this._toppingItemController.delete
        };

        this.ComboItem = {
            add: this._comboItemController.add,
            delete: this._comboItemController.delete
        }

    }

    switchAdaptorMode(mode){
        // TODO: Change REST to adaptor
        if(mode === 'production'){
            this._adaptor.setApolloEndpoint(this.getConfiguration().endpoints.apolloEndpoint.production);
        } else {
            this._adaptor.setApolloEndpoint(this.getConfiguration().endpoints.apolloEndpoint.qa);
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
