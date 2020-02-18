/**
 * Class representing a simple GraphQL server link
 * Author: Jun Zheng
 * License: MIT
 */

const SynchronousLink = require("./SynchronousLink");
import { GraphQLClient } from "graphql-request";

class GraphQLLink extends SynchronousLink {
  _headers: any;
  _client: GraphQLClient;
  /**
   * Construct a new GraphQLLink
   * @param {string} url
   * @param {obejct} config = {}
   */
  constructor(url: string, config: { headers?: any } = {}) {
    super(url);
    this._headers = config.headers || {};
    this._constructClient();
  }

  /**
   * Reconstruct a client instance.
   * @private
   */
  _constructClient() {
    this._client = new GraphQLClient(this._url, {
      headers: this._headers
    });
  }

  /**
   * Alias for run
   * @param config
   * @returns {Promise<Object>}
   */
  async query(config: any): Promise<object> {
    return await this.run(config);
  }

  /**
   * Alias for run
   * @param config
   * @returns {Promise<Object>}
   */
  async mutate(config: any): Promise<object> {
    return await this.run(config);
  }

  /**
   * Run a new graphql request
   * @param config
   * @returns {Promise<object>}
   */
  async run(config: { query: any; variables: any }): Promise<object> {
    return await this._client.request(config.query, config.variables || {});
  }
}

module.exports = GraphQLLink;
