/**
 * Class representing a simple GraphQL server link
 * Author: Jun Zheng
 * License: MIT
 */

const SynchronousLink = require('./SynchronousLink');
const {GraphQLClient} = require('graphql-request');

class GraphQLLink extends SynchronousLink {

    /**
     * Construct a new GraphQLLink
     * @param {string} url
     * @param {object} config = {}
     */
    constructor(url, config = {}) {
        super(url);
        this._headers = config.headers || {};
        this._constructClient();
    }

    /**
     * Reconstruct a client instance.
     * @private
     */
    _constructClient() {
        this._client = new GraphQLClient(
            this._url,
            {
                headers: this._headers
            }
        );
    }

    /**
     * Alias for run
     * @param config
     * @returns {Promise<Object>}
     */
    async query(config) {
        return await this.run(config);
    }

    /**
     * Alias for run
     * @param config
     * @returns {Promise<Object>}
     */
    async mutate(config) {
        return await this.run(config);
    }

    /**
     * Run a new graphql request
     * @param config
     * @returns {Promise<object>}
     */
    async run(config) {
        return await this._client.request(config.query, config.variables || {});
    }
}

module.exports = GraphQLLink;
