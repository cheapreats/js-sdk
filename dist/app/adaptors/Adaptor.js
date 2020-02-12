"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a simple network adaptor
 * Author: Jun Zheng
 * License: UNLICENSED
 */
var Adaptor = function () {
  /**
   * Construct the adaptor
   * @param config
   */
  function Adaptor(config) {
    _classCallCheck(this, Adaptor);

    this._config = config;
  }
  /**
   * Run an adaptor request
   * @param config
   */


  _createClass(Adaptor, [{
    key: "run",
    value: function run(config) {
      throw new Error("Not implemented");
    }
  }]);

  return Adaptor;
}();

module.exports = Adaptor;