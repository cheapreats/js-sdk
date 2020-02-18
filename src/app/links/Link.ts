/**
 * Class representing a network link
 * Author: Jun Zheng
 * License: UNLICENSED
 */

module.exports = (() => {
  class Link {
    _url: any;
    /**
     * Initialize the link with an URL
     * @param url
     */
    constructor(url: any) {
      this._url = url;
    }

    /**
     * Run a request
     * @param config
     */
    run(config: any) {
      throw new Error("Not implemented");
    }
  }
})();
