/**
 * A base class defines a basic user
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const Model = require('../Model');

class User extends Model {
    /**
     * Construct a user object
     */
    constructor(){
        super();
        // Shared properties by all users
        this._id = -1;
        this._emailAddress = "";
    }

}

module.exports = User;
