'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a simple HTTP server link
 * Author: Jun Zheng
 * License: UNLICENSED
 */

var SynchronousLink = require('./SynchronousLink');

var axios = require('axios');

var HttpLink = function (_SynchronousLink) {
    _inherits(HttpLink, _SynchronousLink);

    /**
     * Construct the link with URL
     * @param url
     */
    function HttpLink(url) {
        _classCallCheck(this, HttpLink);

        return _possibleConstructorReturn(this, (HttpLink.__proto__ || Object.getPrototypeOf(HttpLink)).call(this, url));
    }

    /**
     * Run a get request
     * @param config
     * @returns {Promise<Object>}
     */


    _createClass(HttpLink, [{
        key: 'get',
        value: function get() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return this.run(Object.assign(config, { method: 'get' }));
        }

        /**
         * Run a post request
         * @param config
         * @returns {Promise<Object>}
         */

    }, {
        key: 'post',
        value: function post() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return this.run(Object.assign(config, { method: 'post' }));
        }

        /**
         * Run a put request
         * @param config
         * @returns {Promise<Object>}
         */

    }, {
        key: 'put',
        value: function put() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return this.run(Object.assign(config, { method: 'put' }));
        }

        /**
         * Run a delete request
         * @param config
         * @returns {Promise<Object>}
         */

    }, {
        key: 'delete',
        value: function _delete() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return this.run(Object.assign(config, { method: 'delete' }));
        }

        /**
         * Runs a new http request
         * @param config
         * @returns {Promise<object>}
         */

    }, {
        key: 'run',
        value: function run(config) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                axios.request({
                    method: config.method,
                    url: _this2._url,
                    data: config.data ? config.data : {},
                    headers: config.headers ? config.headers : {}
                }).then(function (data) {
                    resolve(data);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return HttpLink;
}(SynchronousLink);

module.exports = HttpLink;