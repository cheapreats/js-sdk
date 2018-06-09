/**
 * The central controller
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const ModelObserver = require('./observers/ModelObserver');

const GraphController = require('./controllers/GraphController');
const HeadOfficeController = require('./controllers/HeadOfficeController');

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
        this._headOfficeController = new HeadOfficeController(this);


        this.Graph = {
            query: this._graphController.query
        };


        this.HeadOffice = {
            create: this._headOfficeController.create,
            update: this._headOfficeController.update
        };

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
