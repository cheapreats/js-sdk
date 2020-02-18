interface Advertisements {
  title?: string;
  link?: string;
  image?: string;
  description?: string;
}
interface DailyDeals {
  link?: string;
  menu_item_id: string;
}
interface SpecialDeals extends DailyDeals {}
interface TimelyDeals {
  menu_item_id: string;
  title?: string;
  link?: string;
  from?: string;
  to?: string;
}
/**
 * Controller related to explore page
 */
class ExplorePageController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.replace = this.replace.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Replace the explore page
   * @param {Array<Advertisements>} advertisements - List of Explore page Ads
   * @param {Array<DailyDeals>} daily_deals - List of Explore page Daily Ads
   * @param {Array<SpecialDeals>} special_deals - List of Explore page Special Deals
   * @param {Array<TimelyDeals>} timely_deals - List of Explore page Timely Deals
   * @returns {Promise<String>} - Updated at
   */
  replace(
    advertisements: Array<Advertisements>,
    daily_deals: Array<DailyDeals>,
    special_deals: Array<SpecialDeals>,
    timely_deals: Array<TimelyDeals>
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($advertisements: [AdvertisementInput], $daily_deals: [DailyDealsInput], $special_deals: [SpecialDealsInput], $timely_deals: [TimelyDealsInput]) { 
                    replaceExplorePage(advertisements: $advertisements, daily_deals: $daily_deals, special_deals: $special_deals, timely_deals: $timely_deals) {
                        updated_at
                    }
                }
            `; //PR coupons is not included as option in mutation but exists as an option in the schema
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          advertisements,
          daily_deals,
          special_deals,
          timely_deals
        })
        .then(
          (result: {
            replaceExplorePage: { updated_at: string | PromiseLike<string> };
            //PR Is promiseLike okay?
          }) => {
            resolve(result.replaceExplorePage.updated_at);
          }
        )
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = ExplorePageController;
