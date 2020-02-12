"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller related to explore page
 */
var ExplorePageController = function () {
    function ExplorePageController(app) {
        _classCallCheck(this, ExplorePageController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.replace = this.replace.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Replace the explore page
     * @param {Object[]} advertisements - List of Explore page Ads
     * @param {Object[]} daily_deals - List of Explore page Daily Ads
     * @param {Object[]} special_deals - List of Explore page Special Deals
     * @param {Object[]} timely_deals - List of Explore page Timely Deals
     * @returns {Promise<String>} - Updated at
     */


    _createClass(ExplorePageController, [{
        key: "replace",
        value: function replace(advertisements, daily_deals, special_deals, timely_deals) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($advertisements: [AdvertisementInput], $daily_deals: [DailyDealsInput], $special_deals: [SpecialDealsInput], $timely_deals: [TimelyDealsInput]) {\n                    replaceExplorePage(advertisements: $advertisements, daily_deals: $daily_deals, special_deals: $special_deals, timely_deals: $timely_deals) {\n                        updated_at\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    advertisements: advertisements, daily_deals: daily_deals, special_deals: special_deals, timely_deals: timely_deals
                }).then(function (result) {
                    resolve(result.replaceExplorePage.updated_at);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return ExplorePageController;
}();

module.exports = ExplorePageController;