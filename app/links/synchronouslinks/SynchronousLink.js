/**
 * Class representing a network link that has request/response structure
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const Link = require('../Link');

class SynchronousLink extends Link {
    constructor(url){
        super(url);
        this._type = "sync";
    }
}

module.exports = SynchronousLink;
