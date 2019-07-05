/**
 * Controller for redeemable items.
 */
class RedeemableItemController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Create a new Redeemable Item, returns RedeemableItem _id if successful
     * @param {Object} redeemable_item - The RedeemableItem object input
     * @returns {Promise<any>} - The id of the RedeemableItem object
     */
    create(redeemable_item){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createRedeemableItem ($redeemable_item: CreateRedeemableItemInput!) {
                    createRedeemableItem(redeemable_item: $redeemable_item) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                redeemable_item
            }).then(result => {
                resolve(result.createRedeemableItem._id);
            }).catch(e => {
                reject(e);
            });
        });
    }


    /**
     * Update an existing RedeemableItem, returns RedeemableItem _id if successful
     * @param {Object} id - ID of the RedeemableItem object to update
     * @param {Object} redeemable_item - The RedeemableItem update object input
     * @returns {Promise<any>} - The id of the RedeemableItem object
     */
    update(id, redeemable_item){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id:String!, $redeemable_item: UpdateRedeemableItemInput!) {
                    updateRedeemableItem(id: $id, redeemable_item: $redeemable_item) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, redeemable_item
            }).then(result => {
                resolve(result.updateRedeemableItem._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a RedeemableItem
     * @param {string} id - The id of the RedeemableItem
     * @returns {Promise<any>} - Return string
     */
    delete(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!) {
                    deleteRedeemableItem(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then((result) => {
                resolve(result.deleteRedeemableItem);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = RedeemableItemController;
