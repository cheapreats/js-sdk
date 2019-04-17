'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Network adaptor for CheaprEats GraphQL
 * Author: Jun Zheng
 * License: UNLICENSED
 */

var Adaptor = require('./Adaptor');
var GraphQLLink = require('../links/synchronouslinks/GraphQLLink');

var CheaprEatsGraphQLAdaptor = function (_Adaptor) {
    _inherits(CheaprEatsGraphQLAdaptor, _Adaptor);

    function CheaprEatsGraphQLAdaptor(config) {
        _classCallCheck(this, CheaprEatsGraphQLAdaptor);

        var _this = _possibleConstructorReturn(this, (CheaprEatsGraphQLAdaptor.__proto__ || Object.getPrototypeOf(CheaprEatsGraphQLAdaptor)).call(this, config));

        _this._graphQLLink = new GraphQLLink(config.graphQLEndpoint);
        return _this;
    }

    /**
     * This function sets the authentication for an application to be authorized to make calls to CheaprEats API
     * @param  {string} token - The Authentication Token
     */


    _createClass(CheaprEatsGraphQLAdaptor, [{
        key: 'setAuthenticationToken',
        value: function setAuthenticationToken(token) {
            this._graphQLLink = new GraphQLLink(this._config.graphQLEndpoint, {
                headers: {
                    authorization: token
                }
            });
        }

        /**
         * @param  {string} url - The URL of the GraphQL API
         */

    }, {
        key: 'setGraphQLEndpoint',
        value: function setGraphQLEndpoint(url) {
            this._graphQLLink = new GraphQLLink(url);
            this._config.graphQLEndpoint = url;
        }

        /**
         * @param  {string} query
         * @param  {object} variables = {}
         */

    }, {
        key: 'query',
        value: function query(_query) {
            var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this._graphQLLink.query({ query: _query, variables: variables });
        }

        /**
         * @param  {string} query
         * @param  {object} variables = {}
         */

    }, {
        key: 'mutate',
        value: function mutate(query) {
            var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this._graphQLLink.mutate({ query: query, variables: variables });
        }
    }]);

    return CheaprEatsGraphQLAdaptor;
}(Adaptor);

module.exports = CheaprEatsGraphQLAdaptor;