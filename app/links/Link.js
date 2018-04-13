/**
 * Class representing a network link
 * Author: Jun Zheng
 * License: UNLICENSED
 */

class Link {
    /**
     * Initialize the link with an URL
     * @param url
     */
    constructor(url){
        this._url = url;
    }


    /**
     * Run a request
     * @param config
     */
    run(config){
        throw new Error("Not implemented");
    }
}

module.exports = Link;
