"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TipController = function () {
    function TipController(app) {
        _classCallCheck(this, TipController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a tip
     * @param  {string} order_id - ID of the order tip is issued for
     * @param  {int} amount - Tip amount in cents
     * @returns {Promise<String>} - Returns the id of the tip created
     */


    _createClass(TipController, [{
        key: "create",
        value: function create(order_id, amount) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($order_id:String!, $amount:Int!) {\n                    createTip(order_id:$order_id, amount:$amount) {\n                        _id,\n                    }\n                }             \n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    order_id: order_id, amount: amount
                }).then(function (result) {
                    resolve(result.createTip._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return TipController;
}();

module.exports = TipController;