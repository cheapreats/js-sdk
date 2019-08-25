/**
 * Controller for orders.
 */
class OrderController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.cancel = this.cancel.bind(this);
        this.beginPreparing = this.beginPreparing.bind(this);
        this.prepared = this.prepared.bind(this);
        this.complete = this.complete.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Place a new order, you must be authenticated as a customer to use this
     * @param {Object} order - The Order Object
     * @param {Boolean} [dry] - Indicator for dry order placement
     * @param {Boolean} [clear_cart] - Indicator to clear all cart after order placement
     * @returns {Promise<any>} - The id of the Order Object
     */
    create(order, dry, clear_cart){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createOrderMutation ($order: CreateOrderInput!, $dry: Boolean, $clear_cart: Boolean) {
                    createOrder(order: $order, dry: $dry, clear_cart: $clear_cart) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                order
            }).then(result => {
                resolve(result.createOrder._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Cancel a order, must be authenticated as vendor
     * @param {string} id - The id of the Order Object
     * @param {string} reason - input type OrderCancellationReason enum indicating reason
     * @param {String} description - Additional details on order cancellation
     * @returns {Promise<any>}
     */
    cancel(id, reason, description = null) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation cancelOrderMutation ($id: String!, $reason: OrderCancellationReason!, $description: String){
                    cancelOrder(id: $id, reason: $reason, description: $description){
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, reason, description
            }).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            })
        })
    }

    /**
     * Set a order as preparing with estimated time
     * @param {string} id - The id of the Order Object
     * @param {int} estimated_preparing_sec - The amount of time the Order will take before it will be prepared
     * @returns {Promise<any>}
     */
    beginPreparing(id, estimated_preparing_sec){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation beginPreparingOrder($id: String!, $estimated_preparing_sec: Int!){
                    beginPreparingOrder(id: $id, estimated_preparing_sec: $estimated_preparing_sec){
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, estimated_preparing_sec
            }).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            })
        })
    }

    /**
     * Set order as prepared
     * @param {string} id - The id of the Order Object
     * @returns {Promise<any>}
     */
    prepared(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation preparedOrderMutation ($id: String!){
                    preparedOrder (id: $id){
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            })
        })
    }

    /**
     * Complete an order
     * @param {string} id - The id of the Order Object
     * @returns {Promise<any>}
     */
    complete(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation completeOrderMutation ($id: String!){
                    completeOrder(id: $id){
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            })
        })
    }
}

module.exports = OrderController;
