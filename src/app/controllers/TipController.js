class TipController {
    constructor(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Create a tip
     * @param  {string} order_id - ID of the order tip is issued for
     * @param  {int} amount - Tip amount in cents
     * @returns {Promise<String>} - Returns the id of the tip created
     */
    create(order_id, amount){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($order_id:String!, $amount:Int!) {
                    createTip(order_id:$order_id, amount:$amount) {
                        _id,
                    }
                }             
            `;
            this.app.getAdaptor().mutate(mutationString, {
                order_id, amount
            }).then((result) => {
                resolve(result.createTip._id);
            }).catch(e => {
                reject(e);
            });
        });
    }
    
}
module.exports = TipController;
