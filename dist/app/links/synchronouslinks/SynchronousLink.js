"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a network link that has request/response structure
 * Author: Jun Zheng
 * License: UNLICENSED
 */
var Link = require('../Link');

var SynchronousLink = function (_Link) {
  _inherits(SynchronousLink, _Link);

  /**
   * @param  {} url
   */
  function SynchronousLink(url) {
    _classCallCheck(this, SynchronousLink);

    var _this = _possibleConstructorReturn(this, (SynchronousLink.__proto__ || Object.getPrototypeOf(SynchronousLink)).call(this, url));

    _this._type = "sync";
    return _this;
  }

  return SynchronousLink;
}(Link);

module.exports = SynchronousLink;