"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a network link
 * Author: Jun Zheng
 * License: UNLICENSED
 */

var Link = function () {
  /**
   * Initialize the link with an URL
   * @param url
   */
  function Link(url) {
    _classCallCheck(this, Link);

    this._url = url;
  }

  /**
   * Run a request
   * @param config
   */


  _createClass(Link, [{
    key: "run",
    value: function run(config) {
      throw new Error("Not implemented");
    }
  }]);

  return Link;
}();

module.exports = Link;