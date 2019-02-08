/**
 * Controller related to payouts
 */
class PayoutController {
    constructor(app){
        this.app = app;
        this.request = this.request.bind(this);
    }

    /**
     * Create a new payout request
     */
    request(vendor_id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($vendor_id: String!) {
                    requestPayout(vendor_id: $vendor_id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                vendor_id
            }).then(result => {
                resolve(result.requestPayout);
            }).catch(e => {
                reject(e);
            });
        });
    }
}

module.exports = PayoutController;
