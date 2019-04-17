'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a simple GraphQL server link
 * Author: Jun Zheng
 * License: MIT
 */

var SynchronousLink = require('./SynchronousLink');

var _require = require('graphql-request'),
    GraphQLClient = _require.GraphQLClient;

var GraphQLLink = function (_SynchronousLink) {
    _inherits(GraphQLLink, _SynchronousLink);

    /**
     * Construct a new GraphQLLink
     * @param {string} url
     * @param {object} config = {}
     */
    function GraphQLLink(url) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, GraphQLLink);

        var _this = _possibleConstructorReturn(this, (GraphQLLink.__proto__ || Object.getPrototypeOf(GraphQLLink)).call(this, url));

        _this._headers = config.headers || {};
        _this._constructClient();
        return _this;
    }

    /**
     * Reconstruct a client instance.
     * @private
     */


    _createClass(GraphQLLink, [{
        key: '_constructClient',
        value: function _constructClient() {
            this._client = new GraphQLClient(this._url, {
                headers: this._headers
            });
        }

        /**
         * Alias for run
         * @param config
         * @returns {Promise<Object>}
         */

    }, {
        key: 'query',
        value: async function query(config) {
            return await this.run(config);
        }

        /**
         * Alias for run
         * @param config
         * @returns {Promise<Object>}
         */

    }, {
        key: 'mutate',
        value: async function mutate(config) {
            return await this.run(config);
        }

        /**
         * Run a new graphql request
         * @param config
         * @returns {Promise<object>}
         */

    }, {
        key: 'run',
        value: async function run(config) {
            return await this._client.request(config.query, config.variables || {});
        }
    }]);

    return GraphQLLink;
}(SynchronousLink);

module.exports = GraphQLLink;