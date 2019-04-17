"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base observer class, this is an interface, must be extended
 * Author: Jun Zheng
 * License: UNLICENSED
 */

var Observer = function () {
  /**
   * Construct the observer class
   */
  function Observer() {
    _classCallCheck(this, Observer);

    this.onNotify = function (instance, payload) {};
  }

  /**
   * Notify this observer
   * @param {object} instance
   * @param {object} payload
   */


  _createClass(Observer, [{
    key: "notify",
    value: function notify(instance, payload) {
      this.onNotify(instance, payload);
    }
  }]);

  return Observer;
}();

module.exports = Observer;