class TipController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a tip
   * @param  {string} order_id - ID of the order tip is issued for
   * @param  {number} amount - Tip amount in cents
   * @returns {Promise<String>} - Returns the id of the tip created
   */
  create(order_id: string, amount: number): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($order_id:String!, $amount:Int!) {
                    createTip(order_id:$order_id, amount:$amount) {
                        _id,
                    }
                }             
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          order_id,
          amount
        })
        .then(
          (result: { createTip: { _id: string | PromiseLike<string> } }) => {
            resolve(result.createTip._id);
          }
        )
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
module.exports = TipController;
