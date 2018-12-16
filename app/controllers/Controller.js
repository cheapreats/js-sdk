/**
 * Controller singleton superclass
 * @abstract
 */
class Controller {

    /**
     * @private
     * @hideconstructor
     */
    constructor() {

    }

    /**
     * Return a new controller instance.
     * @returns {Controller}
     */
    static getInstance() {
        if(!this.instance) {
            this.instance = new this();
        }
        return this;
    }
}

module.exports = Controller;
