/**
 * Controller related to payouts
 */
class PayoutController {
    constructor(app){
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
     * @returns {Promise<any>}
     */
    request(vendor_id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($vendor_id: String!) {
                    requestPayout(vendor_id: $vendor_id) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                vendor_id
            }).then(result => {
                resolve(result.requestPayout._id);
            }).catch(e => {
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
    update(id, payout){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!, $payout:UpdatePayoutInput!) {
                    updatePayout(id: $id, payout: $payout) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, payout
            }).then(result => {
                resolve(result.updatePayout._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Cancel a Payout
     * @param {string} id - Payout ID
     * @returns {Promise<any>}
     */
    cancel(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!) {
                    cancelPayout(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then(result => {
                resolve(result.cancelPayout);
            }).catch(e => {
                reject(e);
            });
        });
    }
}

module.exports = PayoutController;
