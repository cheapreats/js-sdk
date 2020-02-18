/**
 * Base observer class, this is an interface, must be extended
 * Author: Jun Zheng
 * License: UNLICENSED
 */

//PR - Could be an error no "onNotify"

module.exports = (() => {
  class Observer {
    /**
     * Construct the observer class
     */
    constructor() {
      this.onNotify = (instance, payload) => {};
    }

    /**
     * Notify this observer
     * @param {object} instance
     * @param {object} payload
     */
    notify(instance, payload) {
      this.onNotify(instance, payload);
    }
  }
})();
