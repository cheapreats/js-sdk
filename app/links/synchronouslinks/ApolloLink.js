/**
 * Class representing a simple Apollo server link
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const SynchronousLink = require('./SynchronousLink');

// apollo-client stuff
const ApolloClient = require('apollo-client').default;
const ApolloInMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
const ApolloHttpLink = require('apollo-link-http').HttpLink;
const gql = require('graphql-tag');

// Node.js does not support ES6 natively
const fetch = require('node-fetch');

class ApolloLink extends SynchronousLink {

    /**
     * Construct a new ApolloLink
     * @param url
     */
    constructor(url){
        super(url);
        let cache = new ApolloInMemoryCache();
        this._client = new ApolloClient({
            link: new ApolloHttpLink({
                uri: url,
                fetch
            }),
            cache
        });
    }

    /**
     * Run a new apollo request
     * @param config
     * @returns {Promise<object>}
     */
    run(config){
        return new Promise((resolve, reject) => {
            const query = gql(config.query);
            // If the type is query, we call the query
            if(config.type === 'query'){
                this._client.query({
                    query,
                    variables: config.variables ? config.variables : {}
                }).then(data => {
                    resolve(data.data);
                }).catch(e => {
                    reject(e);
                })
            // Otherwise, we call the mutation
            } else {
                this._client.mutate({
                    mutation: query,
                    variables: config.variables ? config.variables : {}
                }).then(data => {
                    resolve(data.data);
                }).catch(e => {
                    reject(e);
                })
            }
        });
    }
}

module.exports = ApolloLink;
