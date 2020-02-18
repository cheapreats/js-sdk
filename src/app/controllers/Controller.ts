/**
 * Controller singleton superclass
 * @abstract
 */
class Controller {
  static instance: any;

  /**
   * @private
   * @hideconstructor
   */
  constructor() {}

  /**
   * Return a new controller instance.
   * @returns {Controller} //PR can a class be a type?
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this;
  }
}

module.exports = Controller;
