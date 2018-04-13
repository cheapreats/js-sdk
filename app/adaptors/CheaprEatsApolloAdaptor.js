/**
 * Network adaptor for CheaprEats GraphQL
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const Adaptor = require('./Adaptor');

class CheaprEatsApolloAdaptor extends Adaptor {
    constructor(config){
        super(config);
    }
}

module.exports = CheaprEatsApolloAdaptor;
