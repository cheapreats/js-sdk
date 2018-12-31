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

    /**
     * This function sets the authentication for an application to be authorized to make calls to CheaprEats API
     * @param  {} token - The Authentication Token
     */
    setAuthenticationToken(token){
        this._apolloLink = new ApolloLink(this._config.apolloEndpoint, {
            headers: {
                authorization: token
            }
        });
    }

    /**
     * @param  {} url - The URL of the GraphQL API Microservice
     */
    setApolloEndpoint(url){
        this._apolloLink = new ApolloLink(url);
        this._config.apolloEndpoint = url;
    }

    /**
     * @param  {} query
     * @param  {} variables={}
     */
    query(query, variables = {}){
        return this._apolloLink.query({ query, variables });
    }

    /**
     * @param  {} query
     * @param  {} variables={}
     */
    mutate(query, variables = {}){
        return this._apolloLink.mutate({ query, variables });
    }
}

module.exports = CheaprEatsApolloAdaptor;
