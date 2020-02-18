/**
 * Observer for models
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const Observer = require('./Observer');

class ModelObserver extends Observer {
    /**
     * Construct the ModelObserver
     */
    constructor(){
        super();
        this._models = [];
    }

    /**
     * Add a new model to currently observing list
     * @param {Model} model
     */
    addModel(model){
        this._models.push(model);
    }

    /**
     * Remove a model from currently observing list
     * @param model
     */
    removeModel(model){
        let index = this._models.indexOf(model);
        if(index > -1){
            this._models.splice(index, 1);
        }
    }
}

module.exports = ModelObserver;
