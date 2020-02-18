enum PayoutMethod {
  MANUAL = "MANUAL"
}
enum PayoutStatus {
  PENDING = "PENDING",
  IN_TRANSIT = "IN_TRANSIT",
  PAID = "PAID",
  CANCELLED = "CANCELLED"
}
interface UpdatePayout {
  orders?: Array<string>;
  service_charges?: Array<string>;
  note?: string;
  method?: PayoutMethod;
  status?: PayoutStatus;
}
/**
 * Controller related to payouts
 */
class PayoutController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.request = this.request.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new payout request
   * @param {String} vendor_id - Vendor ID
   * @param {Boolean} dry - Dry run or not
   * @returns {Promise<{_id: string, total: number}>}
   */
  request(
    vendor_id: string,
    dry: boolean = false
  ): Promise<{ _id: string; total: number }> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($vendor_id: String!, $dry: Boolean) {
                    requestPayout(vendor_id: $vendor_id, dry: $dry) {
                        _id
                        total
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          dry
        })
        .then(
          (result: {
            requestPayout:
              | { _id: string; total: number }
              | PromiseLike<{ _id: string; total: number }>;
          }) => {
            resolve(result.requestPayout);
          }
        )
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing pending payout
   * @param {String} id - Payout ID
   * @param {String} payout - Updated payout object
   * @returns {Promise<any>}
   */
  update(id: string, payout: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $payout:UpdatePayoutInput!) {
                    updatePayout(id: $id, payout: $payout) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          payout
        })
        .then((result: { updatePayout: { _id: any } }) => {
          resolve(result.updatePayout._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Cancel a Payout
   * @param {string} id - Payout ID
   * @returns {Promise<any>}
   */
  cancel(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    cancelPayout(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { cancelPayout: any }) => {
          resolve(result.cancelPayout);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = PayoutController;
