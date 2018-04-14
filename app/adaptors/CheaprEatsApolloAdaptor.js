/**
 * Network adaptor for CheaprEats GraphQL
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const Adaptor = require('./Adaptor');
const ApolloLink = require('../links/synchronouslinks/ApolloLink');

class CheaprEatsApolloAdaptor extends Adaptor {
    constructor(config){
        super(config);
        this._apolloLink = new ApolloLink(config.apolloEndpoint);
    }

    setAuthenticationToken(token){
        this._apolloLink = new ApolloLink(this._config.apolloEndpoint, {
            headers: {
                authorization: token
            }
        });
    }

    query(query, variables = {}){
        return this._apolloLink.query({ query, variables });
    }

    mutate(query, variables = {}){
        return this._apolloLink.mutate({ query, variables });
    }
}

module.exports = CheaprEatsApolloAdaptor;
