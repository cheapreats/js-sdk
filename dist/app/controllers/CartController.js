"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CartController = function () {
    function CartController(app) {
        _classCallCheck(this, CartController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.updateNote = this.updateNote.bind(this);
        this.removeCoupon = this.removeCoupon.bind(this);
        this.applyCoupon = this.applyCoupon.bind(this);
        this.delete = this.delete.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.create = this.create.bind(this);
    }
    // ADD MUTATION METHODS BELOW


    _createClass(CartController, [{
        key: "updateNote",
        value: function updateNote(cartId, note) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($cartId: String!, $note: String!) {\n                    updateNoteForCart(cart_id: $cartId, note: $note) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    cartId: cartId, note: note
                }).then(function (result) {
                    resolve(result.updateNoteForCart);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }, {
        key: "removeCoupon",
        value: function removeCoupon(cartId, cartCouponId) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($cartId: String!, $cartCouponId: String!) {\n                    removeCouponFromCart(cart_id: $cartId, cart_coupon_id: $cartCouponId) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    cartId: cartId, cartCouponId: cartCouponId
                }).then(function (result) {
                    resolve(result.removeCouponFromCart);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }, {
        key: "applyCoupon",
        value: function applyCoupon(cartId, couponCode) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($cartId: String!, $couponCode: String!) {\n                    applyCouponToCart(cart_id: $cartId, coupon_code: $couponCode) {\n                        _id\n                    }\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    cartId: cartId, couponCode: couponCode
                }).then(function (result) {
                    resolve(result.applyCouponToCart);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Delete a cart
         * @param cartId
         * @returns {Promise<any>}
         */

    }, {
        key: "delete",
        value: function _delete(cartId) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($cartId: String!) {\n                    deleteCart(cart_id: $cartId)\n                }\n            ";
                _this4.app.getAdaptor().mutate(mutationString, {
                    cartId: cartId
                }).then(function (result) {
                    resolve(result.deleteCart);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Remove an item from currently active cart.
         * @param cartId
         * @param cartItemId
         * @returns {Promise<any>}
         */

    }, {
        key: "removeItem",
        value: function removeItem(cartId, cartItemId) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($cartId: String!, $cartItemId: String!) {\n                    removeItemFromCart(\n                        cart_id: $cartId,\n                        cart_item_id: $cartItemId\n                    ) {\n                        _id\n                    }\n                }\n            ";
                _this5.app.getAdaptor().mutate(mutationString, {
                    cartId: cartId, cartItemId: cartItemId
                }).then(function (result) {
                    resolve(result.removeItemFromCart);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Add an new item to currently active cart.
         * @param cartId
         * @param item
         * @returns {Promise<any>}
         */

    }, {
        key: "addItem",
        value: function addItem(cartId, item) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($cartId: String!, $item: AddItemToCartInput!) {\n                    addItemToCart(\n                        cart_id: $cartId,\n                        item: $item\n                    ) {\n                        _id\n                    }\n                }\n            ";
                _this6.app.getAdaptor().mutate(mutationString, {
                    cartId: cartId, item: item
                }).then(function (result) {
                    resolve(result.addItemCart);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Create a new cart, remove all old carts.
         * @param customerId
         * @param vendorId
         * @returns {Promise<any>}
         */

    }, {
        key: "create",
        value: function create(customerId, vendorId) {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($customerId: String!, $vendorId: String!) {\n                    createCart(\n                        customer_id: $customerId,\n                        vendor_id: $vendorId\n                    ) {\n                        _id\n                    }\n                }\n            ";
                _this7.app.getAdaptor().mutate(mutationString, {
                    customerId: customerId, vendorId: vendorId
                }).then(function (result) {
                    resolve(result.createCart);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return CartController;
}();

module.exports = CartController;