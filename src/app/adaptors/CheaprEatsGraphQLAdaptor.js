/**
 * Network adaptor for CheaprEats GraphQL
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const Adaptor      = require('./Adaptor');
const GraphQLLink  = require('../links/synchronouslinks/GraphQLLink');
let packageDotJson = require('../../../package.json');

class CheaprEatsGraphQLAdaptor extends Adaptor {
    constructor(config) {
        super(config);
        this._graphQLLink = new GraphQLLink(config.graphQLEndpoint, {version: packageDotJson.version || null});
    }

    /**
     * This function sets the authentication for an application to be authorized to make calls to CheaprEats API
     * @param  {string} token - The Authentication Token
     */
    setAuthenticationToken(token) {
        this._graphQLLink = new GraphQLLink(this._config.graphQLEndpoint, {
            headers: {
                version: packageDotJson.version || null,
                authorization: token
            }
        });
    }

    /**
     * @param  {string} url - The URL of the GraphQL API
     */
    setGraphQLEndpoint(url) {
        this._graphQLLink            = new GraphQLLink(url);
        this._config.graphQLEndpoint = url;
    }

    /**
     * @param  {string} query
     * @param  {object} variables = {}
     */
    query(query, variables = {}) {
        return this._graphQLLink.query({query, variables});
    }

    /**
     * @param  {string} query
     * @param  {object} variables = {}
     */
    mutate(query, variables = {}) {
        return this._graphQLLink.mutate({query, variables});
    }
}

module.exports = CheaprEatsGraphQLAdaptor;
