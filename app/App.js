/**
 * The central controller
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const GET_VERIFICATION_CODE_ENDPOINT = 'https://cheapreats-qa-graphql.azurewebsites.net/get_code';
const APOLLO_ENDPOINT = 'https://cheapreats-qa-graphql.azurewebsites.net/graphql';

const ModelObserver = require('./observers/ModelObserver');

const Verify = require('./models/Verify');

const GraphController = require('./controllers/GraphController');
const CustomerController = require('./controllers/CustomerController');
const VendorController = require('./controllers/VendorController');
const OrderController = require('./controllers/OrderController');

const CheaprEatsApolloAdaptor = require('./adaptors/CheaprEatsApolloAdaptor');

class App {
    constructor(){
        this._modelObserver = new ModelObserver();

        this._adaptor = new CheaprEatsApolloAdaptor({
            apolloEndpoint: APOLLO_ENDPOINT
        });


        this._graphController = new GraphController(this._adaptor);
        this._customerController = new CustomerController(this);
        this._vendorController = new VendorController(this);
        this._orderController = new OrderController(this);

        this.Verify = new Verify({
            getVerificationCodeEndpoint: GET_VERIFICATION_CODE_ENDPOINT
        });

        this.Graph = {
            query: this._graphController.query
        };

        this.Customer = {
            create: this._customerController.create,
            authenticate: this._customerController.authenticate
        };

        this.Vendor = {
            authenticate: this._vendorController.authenticate
        };

        this.Order = {
            create: this._orderController.create
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
     * Set current authentication token
     * @param token
     */
    setAuthenticationToken(token){
        this._adaptor.setAuthenticationToken(token);
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
