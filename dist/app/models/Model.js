"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for models
 * Author: Jun Zheng
 * License: UNLICENSED
 */
var Model = function () {
    /**
     * Construct the model
     */
    function Model() {
        _classCallCheck(this, Model);

        this._observers = [];
    }
    /**
     * Insert the model to database
     */


    _createClass(Model, [{
        key: "insert",
        value: function insert() {
            throw new Error("not implemented");
        }
        /**
         * Remove the model from database
         */

    }, {
        key: "destroy",
        value: function destroy() {
            throw new Error("not implemented");
        }
        /**
         * Register a new observer
         * @param {ModelObserver} observer
         */

    }, {
        key: "addObserver",
        value: function addObserver(observer) {
            this._observers.push(observer);
            observer.addModel(this);
        }
        /**
         * Remove an observer
         * @param {ModelObserver} observer
         */

    }, {
        key: "removeObserver",
        value: function removeObserver(observer) {
            var index = this._observers.indexOf(observer);
            if (index > -1) {
                this._observers.splice(index, 1);
            }
            observer.removeModel(this);
        }
        /**
         * Notify all observers with a specified payload
         * @param {object} payload
         */

    }, {
        key: "notifyObservers",
        value: function notifyObservers(payload) {
            for (var i in this._observers) {
                this._observers[i].notify(this, payload);
            }
        }
    }]);

    return Model;
}();

module.exports = Model;