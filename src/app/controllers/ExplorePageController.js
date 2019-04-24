/**
 * Controller related to explore page
 */
class ExplorePageController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.replace = this.replace.bind(this);
    }

    /**
     * Replace the explore page
     * @param {Object[]} advertisements - List of Explore page Ads
     * @param {Object[]} daily_deals - List of Explore page Daily Ads
     * @param {Object[]} special_deals - List of Explore page Special Deals
     * @param {Object[]} timely_deals - List of Explore page Timely Deals
     * @returns {Promise<String>} - Updated at
     */
    replace(advertisements, daily_deals, special_deals, timely_deals){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($advertisements: [AdvertisementInput], $daily_deals: [DailyDealsInput], $special_deals: [SpecialDealsInput], $timely_deals: [TimelyDealsInput]) {
                    replaceExplorePage(advertisements: $advertisements, daily_deals: $daily_deals, special_deals: $special_deals, timely_deals: $timely_deals) {
                        updated_at
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                advertisements, daily_deals, special_deals, timely_deals
            }).then(result => {
                resolve(result.replaceExplorePage.updated_at);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = ExplorePageController;
