/**
 * The central controller
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const GET_VERIFICATION_CODE_ENDPOINT = 'https://cheapreats-qa-graphql.azurewebsites.net/get_code';


const ModelObserver = require('./observers/ModelObserver');



const Verify = require('./models/Verify');

class App {
    constructor(){
        this._modelObserver = new ModelObserver();
        this.Verify = new Verify({
            getVerificationCodeEndpoint: GET_VERIFICATION_CODE_ENDPOINT
        });
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
