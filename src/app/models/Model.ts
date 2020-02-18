/**
 * Base class for models
 * Author: Jun Zheng
 * License: UNLICENSED
 */

module.exports = (() => {
  class Model {
    _observers: any[];
    /**
     * Construct the model
     */
    constructor() {
      this._observers = [];
    }

    /**
     * Insert the model to database
     */
    insert() {
      throw new Error("not implemented");
    }

    /**
     * Remove the model from database
     */
    destroy() {
      throw new Error("not implemented");
    }

    /**
     * Register a new observer
     * @param {ModelObserver} observer
     */
    //PR - how is modelObserver used - its not a type interface was here pre ts conversion
    addObserver(observer) {
      this._observers.push(observer);
      observer.addModel(this);
    }

    /**
     * Remove an observer
     * @param {ModelObserver} observer
     */
    removeObserver(observer) {
      let index = this._observers.indexOf(observer);
      if (index > -1) {
        this._observers.splice(index, 1);
      }
      observer.removeModel(this);
    }

    /**
     * Notify all observers with a specified payload
     * @param {object} payload
     */
    notifyObservers(payload: object) {
      for (let i in this._observers) {
        this._observers[i].notify(this, payload);
      }
    }
  }
})();
