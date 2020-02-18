/**
 * Class representing a simple HTTP server link
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const SynchronousLink = require("./SynchronousLink");

import axios from "axios";

module.exports = (() => {
  class HttpLink extends SynchronousLink {
    _url: string;
    /**
     * Construct the link with URL
     * @param url
     */
    constructor(url: any) {
      super(url);
    }

    /**
     * Run a get request
     * @param config
     * @returns {Promise<Object>}
     */
    get(config: {} = {}): Promise<object> {
      return this.run(Object.assign(config, { method: "get" }));
    }

    /**
     * Run a post request
     * @param config
     * @returns {Promise<Object>}
     */
    post(config: {} = {}): Promise<object> {
      return this.run(Object.assign(config, { method: "post" }));
    }

    /**
     * Run a put request
     * @param config
     * @returns {Promise<Object>}
     */
    put(config: {} = {}): Promise<object> {
      return this.run(Object.assign(config, { method: "put" }));
    }

    /**
     * Run a delete request
     * @param config
     * @returns {Promise<Object>}
     */
    delete(config: {} = {}): Promise<object> {
      return this.run(Object.assign(config, { method: "delete" }));
    }

    /**
     * Runs a new http request
     * @param config
     * @returns {Promise<object>}
     */
    run(config: { method: any; data?: any; headers?: any }): Promise<object> {
      return new Promise((resolve, reject) => {
        axios
          .request({
            method: config.method,
            url: this._url,
            data: config.data ? config.data : {},
            headers: config.headers ? config.headers : {}
          })
          .then(data => {
            resolve(data);
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  }
})();
