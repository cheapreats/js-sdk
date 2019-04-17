'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Observer for models
 * Author: Jun Zheng
 * License: UNLICENSED
 */

var Observer = require('./Observer');

var ModelObserver = function (_Observer) {
    _inherits(ModelObserver, _Observer);

    /**
     * Construct the ModelObserver
     */
    function ModelObserver() {
        _classCallCheck(this, ModelObserver);

        var _this = _possibleConstructorReturn(this, (ModelObserver.__proto__ || Object.getPrototypeOf(ModelObserver)).call(this));

        _this._models = [];
        return _this;
    }

    /**
     * Add a new model to currently observing list
     * @param {Model} model
     */


    _createClass(ModelObserver, [{
        key: 'addModel',
        value: function addModel(model) {
            this._models.push(model);
        }

        /**
         * Remove a model from currently observing list
         * @param model
         */

    }, {
        key: 'removeModel',
        value: function removeModel(model) {
            var index = this._models.indexOf(model);
            if (index > -1) {
                this._models.splice(index, 1);
            }
        }
    }]);

    return ModelObserver;
}(Observer);

module.exports = ModelObserver;