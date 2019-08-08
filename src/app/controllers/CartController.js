class CartController {
    constructor(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.removeCoupon = this.removeCoupon.bind(this);
        this.applyCoupon = this.applyCoupon.bind(this);
        this.delete = this.delete.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.create = this.create.bind(this);
    }
    
    // ADD MUTATION METHODS BELOW
    
    removeCoupon(cartId, cartCouponId){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($cartId: String!, $cartCouponId: String!) {
                    removeCouponFromCart(cart_id: $cartId, cart_coupon_id: $cartCouponId) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                cartId, cartCouponId
            }).then((result) => {
                resolve(result.removeCouponFromCart);
            }).catch(e => {
                reject(e);
            });
        });
    }
    
    applyCoupon(cartId, couponCode){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($cartId: String!, $couponCode: String!) {
                    applyCouponToCart(cart_id: $cartId, coupon_code: $couponCode) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                cartId, couponCode
            }).then((result) => {
                resolve(result.applyCouponToCart);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a cart
     * @param cartId
     * @returns {Promise<any>}
     */
    delete(cartId){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($cartId: String!) {
                    deleteCart(cart_id: $cartId)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                cartId
            }).then((result) => {
                resolve(result.deleteCart);
            }).catch(e => {
                reject(e);
            });
        });
    }

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
                    removeItemFromCart(
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
                resolve(result.removeItemFromCart);
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
                    addItemToCart(
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
