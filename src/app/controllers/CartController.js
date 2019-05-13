class CartController {
    constructor(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.create = this.create.bind(this);
    }
    
    // ADD MUTATION METHODS BELOW

    /**
     * Remove an item from currently active cart.
     * @param cartId
     * @param cartItemId
     * @returns {Promise<any>}
     */
    removeItem(cartId, cartItemId){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($cartId: String!, $cartItemId: String!) {
                    removeItemCart(
                        cart_id: $cartId,
                        cart_item_id: $cartItemId
                    ) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                cartId, cartItemId
            }).then((result) => {
                resolve(result.removeItemCart);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Add an new item to currently active cart.
     * @param cartId
     * @param item
     * @returns {Promise<any>}
     */
    addItem(cartId, item){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($cartId: String!, $item: AddItemToCartInput!) {
                    addItemCart(
                        cart_id: $cartId,
                        item: $item
                    ) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                cartId, item,
            }).then((result) => {
                resolve(result.addItemCart);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Create a new cart, remove all old carts.
     * @param customerId
     * @param vendorId
     * @returns {Promise<any>}
     */
    create(customerId, vendorId){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($customerId: String!, $vendorId: String!) {
                    createCart(
                        customer_id: $customerId,
                        vendor_id: $vendorId
                    ) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                customerId, vendorId
            }).then((result) => {
                resolve(result.createCart);
            }).catch(e => {
                reject(e);
            });
        });
    }
    
}
module.exports = CartController;
