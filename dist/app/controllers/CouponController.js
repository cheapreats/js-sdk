"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for coupons.
 */
var CouponController = function () {
    function CouponController(app) {
        _classCallCheck(this, CouponController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new coupon, return coupon ID if successful
     * @param {Object} category - The Coupon Object
     * @returns {Promise<any>}
     */


    _createClass(CouponController, [{
        key: "create",
        value: function create(coupon) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createCouponMutation ($coupon: CreateCouponInput!) {\n                    createCoupon(coupon: $coupon) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    coupon: coupon
                }).then(function (result) {
                    resolve(result.createCoupon._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return CouponController;
}();

module.exports = CouponController;