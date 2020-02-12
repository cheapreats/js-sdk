"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for loyalty cards.
 */
var LoyaltyCardController = function () {
    function LoyaltyCardController(app) {
        _classCallCheck(this, LoyaltyCardController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.createLoyaltyCardAndEnroll = this.createLoyaltyCardAndEnroll.bind(this);
        this.awardPointsToLoyaltyCard = this.awardPointsToLoyaltyCard.bind(this);
        this.awardShareablePointsToLoyaltyCard = this.awardShareablePointsToLoyaltyCard.bind(this);
        this.shareLoyaltyPoints = this.shareLoyaltyPoints.bind(this);
        this.redeemLoyaltyPointsForCoupon = this.redeemLoyaltyPointsForCoupon.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new Loyalty Card, automatically enrolling user in the loyalty program
     * @param {Object} loyalty_card - The LoyaltyCard object input
     * @returns {Promise<any>} - The id of the LoyaltyCard object
     */


    _createClass(LoyaltyCardController, [{
        key: "createLoyaltyCardAndEnroll",
        value: function createLoyaltyCardAndEnroll(loyalty_card) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($loyalty_card:CreateLoyaltyCardInput!) {\n                    createLoyaltyCardAndEnroll(loyalty_card: $loyalty_card) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    loyalty_card: loyalty_card
                }).then(function (result) {
                    resolve(result.createLoyaltyCardAndEnroll._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Award usable points to a loyalty card
         * @param {String} id - ID of the loyalty card to which points are awarded
         * @param {Object} amount - Number of points to award to loyalty card
         * @returns {Promise<any>} - The id of the LoyaltyTransaction
         */

    }, {
        key: "awardPointsToLoyaltyCard",
        value: function awardPointsToLoyaltyCard(id, amount) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!, $amount: Int!) {\n                    awardPointsToLoyaltyCard(id: $id, amount: $amount) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, amount: amount
                }).then(function (result) {
                    resolve(result.awardPointsToLoyaltyCard._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Award shareable points to a loyalty card
         * @param {String} id - ID of the loyalty card to which shareable points are awarded
         * @param {Object} amount - Number of shareable points to award to loyalty card
         * @returns {Promise<any>} - The id of the LoyaltyTransaction
         */

    }, {
        key: "awardShareablePointsToLoyaltyCard",
        value: function awardShareablePointsToLoyaltyCard(id, amount) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!, $amount: Int!) {\n                    awardShareablePointsToLoyaltyCard(id: $id, amount: $amount) {\n                        _id\n                    }\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id, amount: amount
                }).then(function (result) {
                    resolve(result.awardShareablePointsToLoyaltyCard._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Enable sharing of loyalty points from one loyalty card to another
         * @param {String} sender_customer_id - ID of the customer transferring loyalty points
         * @param {String} receiver_phone_number - Phone number of the receiver receiving the points
         * @param {String} loyalty_program_id - ID of the loyalty program in context of which points are shared
         * @param {Object} no_of_points_to_share - Number of points to share
         * @returns {Promise<any>} - The id of the LoyaltyTransaction
         */

    }, {
        key: "shareLoyaltyPoints",
        value: function shareLoyaltyPoints(sender_customer_id, receiver_phone_number, loyalty_program_id, no_of_points_to_share) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($sender_customer_id: String!, $receiver_phone_number: String!, $loyalty_program_id: String!, $no_of_points_to_share: Int!) {\n                    shareLoyaltyPoints(sender_customer_id: $sender_customer_id, receiver_phone_number: $receiver_phone_number, loyalty_program_id: $loyalty_program_id, no_of_points_to_share: $no_of_points_to_share) {\n                        _id\n                    }\n                }\n            ";
                _this4.app.getAdaptor().mutate(mutationString, {
                    sender_customer_id: sender_customer_id,
                    receiver_phone_number: receiver_phone_number,
                    loyalty_program_id: loyalty_program_id,
                    no_of_points_to_share: no_of_points_to_share
                }).then(function (result) {
                    resolve(result.shareLoyaltyPoints._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Redeem a coupon in exchange of loyalty points for a particular item redeemable in a vendor's loyalty program
         * @param {string} loyalty_card_id - The id of the Loyalty Card
         * @param {string} menu_item_id - The id of the Menu ID which must be a redeemable in the vendor's loyalty plan
         * @returns {Promise<any>} - ID of the Coupon generated
         */

    }, {
        key: "redeemLoyaltyPointsForCoupon",
        value: function redeemLoyaltyPointsForCoupon(loyalty_card_id, menu_item_id) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($loyalty_card_id: String!, $menu_item_id: String!) {\n                    redeemLoyaltyPointsForCoupon(loyalty_card_id: $loyalty_card_id, menu_item_id: $menu_item_id) {\n                        _id\n                    }\n                }\n            ";
                _this5.app.getAdaptor().mutate(mutationString, {
                    loyalty_card_id: loyalty_card_id,
                    menu_item_id: menu_item_id
                }).then(function (result) {
                    resolve(result.redeemLoyaltyPointsForCoupon._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return LoyaltyCardController;
}();

module.exports = LoyaltyCardController;