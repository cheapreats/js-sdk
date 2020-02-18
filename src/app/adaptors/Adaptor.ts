/**
 * Class representing a simple network adaptor
 * Author: Jun Zheng
 * License: UNLICENSED
 */

module.exports = (() => {
  return class Adaptor {
    _config: any;
    constructor(config: any) {
      /**
       * Construct the adaptor
       * @param {any} config
       */
      this._config = config;
    }

    /**
     * Run an adaptor request
     * @param {any} config
     */
    run(config: any) {
      throw new Error("Not implemented");
    }
  };
})();
