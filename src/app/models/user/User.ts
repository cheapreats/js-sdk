/**
 * A base class defines a basic user
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const Model = require("../Model");

module.exports = (() => {
  class User extends Model {
    _id: number;
    _emailAddress: string;
    /**
     * Construct a user object
     */
    constructor() {
      super();
      // Shared properties by all users
      this._id = -1;
      this._emailAddress = "";
    }
  }
})();
