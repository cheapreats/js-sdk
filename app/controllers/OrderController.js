class OrderController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.cancel = this.cancel.bind(this);
        this.beginPreparing = this.beginPreparing.bind(this);
        this.prepared = this.prepared.bind(this);
        this.complete = this.complete.bind(this);
    }

    /**
     * Place a new order, you must be authenticated as a customer to use this
     * @param orderItems
     * @param orderComboItems
     * @param scheduledPickupTime
     * @param note
     * @param paymentMethod
     * @returns {Promise<any>}
     */
    create(orderItems, orderComboItems, scheduledPickupTime, note = "", paymentMethod){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation addOrderMutation ($orderItems: [OrderItemInput]!, $orderComboItems: [OrderComboItemInput]!, $scheduledPickupTime: String!, $note: String!, $paymentMethod: Int!) {
                    addOrder(orderItems: $orderItems, orderComboItems: $orderComboItems, scheduledPickupTime: $scheduledPickupTime, note: $note, paymentMethod: $paymentMethod) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                orderItems, orderComboItems, scheduledPickupTime, note, paymentMethod
            }).then(result => {
                resolve(result.addOrder.id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Cancel a order, must be authenticated as vendor
     * @param id
     * @param reason
     * @returns {Promise<any>}
     */
    cancel(id, reason){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation cancelOrderMutation ($id: String!, $reason: String!){
                    cancelOrder(id: $id, reason: $reason){
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, reason
            }).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            })
        })
    }

    /**
     * Set a order as preparing with estimated time
     * @param id
     * @param estimated_preparing_sec
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
     * @param id
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
     * @param id
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
