/**
 * Class representing a simple network adaptor
 * Author: Jun Zheng
 * License: UNLICENSED
 */

class Adaptor {

    /**
     * Construct the adaptor
     * @param config
     */
    constructor(config){
        this._config = config;
    }

    /**
     * Run an adaptor request
     * @param config
     */
    run(config){
        throw new Error("Not implemented");
    }
}

module.exports = Adaptor;
