interface CreateLoyalty {
  loyalty_program_id: string;
  customer_id?: string;
  phone_number?: string;
}
/**
 * Controller for loyalty cards.
 */
class LoyaltyCardController {
  app: any;
  constructor(app) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.createLoyaltyCardAndEnroll = this.createLoyaltyCardAndEnroll.bind(
      this
    );
    this.awardPointsToLoyaltyCard = this.awardPointsToLoyaltyCard.bind(this);
    this.awardShareablePointsToLoyaltyCard = this.awardShareablePointsToLoyaltyCard.bind(
      this
    );
    this.shareLoyaltyPoints = this.shareLoyaltyPoints.bind(this);
    this.redeemLoyaltyPointsForCoupon = this.redeemLoyaltyPointsForCoupon.bind(
      this
    );
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new Loyalty Card, automatically enrolling user in the loyalty program
   * @param {CreateLoyalty} loyalty_card - The LoyaltyCard object input
   * @returns {Promise<any>} - The id of the LoyaltyCard object
   */
  createLoyaltyCardAndEnroll(loyalty_card: CreateLoyalty): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($loyalty_card:CreateLoyaltyCardInput!) {
                    createLoyaltyCardAndEnroll(loyalty_card: $loyalty_card) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          loyalty_card
        })
        .then((result: { createLoyaltyCardAndEnroll: { _id: any } }) => {
          resolve(result.createLoyaltyCardAndEnroll._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Award usable points to a loyalty card
   * @param {String} id - ID of the loyalty card to which points are awarded
   * @param {number} amount - Number of points to award to loyalty card
   * @returns {Promise<any>} - The id of the LoyaltyTransaction
   */
  awardPointsToLoyaltyCard(id: string, amount: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $amount: Int!) {
                    awardPointsToLoyaltyCard(id: $id, amount: $amount) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          amount
        })
        .then((result: { awardPointsToLoyaltyCard: { _id: any } }) => {
          resolve(result.awardPointsToLoyaltyCard._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Award shareable points to a loyalty card
   * @param {String} id - ID of the loyalty card to which shareable points are awarded
   * @param {Number} amount - Number of shareable points to award to loyalty card
   * @returns {Promise<any>} - The id of the LoyaltyTransaction
   */
  awardShareablePointsToLoyaltyCard(id: string, amount: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $amount: Int!) {
                    awardShareablePointsToLoyaltyCard(id: $id, amount: $amount) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          amount
        })
        .then((result: { awardShareablePointsToLoyaltyCard: { _id: any } }) => {
          resolve(result.awardShareablePointsToLoyaltyCard._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Enable sharing of loyalty points from one loyalty card to another
   * @param {String} sender_customer_id - ID of the customer transferring loyalty points
   * @param {String} receiver_phone_number - Phone number of the receiver receiving the points
   * @param {String} loyalty_program_id - ID of the loyalty program in context of which points are shared
   * @param {Number} no_of_points_to_share - Number of points to share
   * @returns {Promise<any>} - The id of the LoyaltyTransaction
   */
  shareLoyaltyPoints(
    sender_customer_id: string,
    receiver_phone_number: string,
    loyalty_program_id: string,
    no_of_points_to_share: number
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($sender_customer_id: String!, $receiver_phone_number: String!, $loyalty_program_id: String!, $no_of_points_to_share: Int!) {
                    shareLoyaltyPoints(sender_customer_id: $sender_customer_id, receiver_phone_number: $receiver_phone_number, loyalty_program_id: $loyalty_program_id, no_of_points_to_share: $no_of_points_to_share) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          sender_customer_id,
          receiver_phone_number,
          loyalty_program_id,
          no_of_points_to_share
        })
        .then((result: { shareLoyaltyPoints: { _id: any } }) => {
          resolve(result.shareLoyaltyPoints._id);
        })
        .catch((e: any) => {
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
  redeemLoyaltyPointsForCoupon(
    loyalty_card_id: string,
    menu_item_id: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($loyalty_card_id: String!, $menu_item_id: String!) {
                    redeemLoyaltyPointsForCoupon(loyalty_card_id: $loyalty_card_id, menu_item_id: $menu_item_id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          loyalty_card_id,
          menu_item_id
        })
        .then((result: { redeemLoyaltyPointsForCoupon: { _id: any } }) => {
          resolve(result.redeemLoyaltyPointsForCoupon._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = LoyaltyCardController;
