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
const ApolloLinkContext = require('apollo-link-context');

// Node.js does not support ES6 natively
const fetch = require('node-fetch');

class ApolloLink extends SynchronousLink {

    /**
     * Construct a new ApolloLink
     * @param {string} url
     * @param {object} config = {}
     */
    constructor(url, config = {}) {
        super(url);
        this._headers = {};

        let cache = new ApolloInMemoryCache();

        let link = new ApolloHttpLink({
            uri: url,
            fetch
        });

        if (config.headers) {
            let headersLink = ApolloLinkContext.setContext(() => {
                return {
                    headers: config.headers
                }
            });
            link = headersLink.concat(link);
            this._headers = config.headers;
        }

        this._client = new ApolloClient({
            link,
            cache
        });
        this._link = link;
    }

    /**
     * Alias for run but automatically sets type as query
     * @param config
     * @returns {Promise<Object>}
     */
    query(config){
        return this.run({...config, type: 'query'});
    }

    /**
     * Alias for run, but automatically sets type as mutation
     * @param config
     * @returns {Promise<Object>}
     */
    mutate(config){
        return this.run({...config, type: 'mutation'});
    }

    /**
     * Run a new apollo request
     * @param config
     * @returns {Promise<object>}
     */
    run(config) {
        return new Promise((resolve, reject) => {
            const query = gql(config.query);
            // If the type is query, we call the query
            if (config.type === 'query') {
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
