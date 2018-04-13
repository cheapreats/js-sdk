/**
 * Class representing a simple HTTP server link
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const SynchronousLink = require('./SynchronousLink');

const axios = require('axios');

class HttpLink extends SynchronousLink {
    /**
     * Construct the link with URL
     * @param url
     */
    constructor(url){
        super(url);
    }

    /**
     * Run a get request
     * @param config
     * @returns {Promise<Object>}
     */
    get(config = {}){
        return this.run({...config, method: 'get'});
    }

    /**
     * Run a post request
     * @param config
     * @returns {Promise<Object>}
     */
    post(config = {}){
        return this.run({...config, method: 'post'});
    }

    /**
     * Run a put request
     * @param config
     * @returns {Promise<Object>}
     */
    put(config = {}){
        return this.run({...config, method: 'put'});
    }

    /**
     * Run a delete request
     * @param config
     * @returns {Promise<Object>}
     */
    delete(config = {}){
        return this.run({...config, method: 'delete'});
    }

    /**
     * Runs a new http request
     * @param config
     * @returns {Promise<object>}
     */
    run(config){
        return new Promise((resolve, reject) => {
            axios.request({
                method: config.method,
                url: this._url,
                data: config.data ? config.data : {},
                headers: config.headers ? config.headers: {}
            }).then(data => {
                resolve(data);
            }).catch(e => {
                reject(e);
            })
        });
    }
}

module.exports = HttpLink;
