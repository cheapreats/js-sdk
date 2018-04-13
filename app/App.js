/**
 * The central controller
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const ModelObserver = require('./observers/ModelObserver');

class App {
    constructor(){
        this._modelObserver = new ModelObserver();
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
