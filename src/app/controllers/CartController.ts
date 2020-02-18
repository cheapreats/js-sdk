interface CartItem {
  item_id: string;
  modifiers: Array<{ modifier_id: string; choices: Array<string> }>;
}

class CartController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.updateNote = this.updateNote.bind(this);
    this.removeCoupon = this.removeCoupon.bind(this);
    this.applyCoupon = this.applyCoupon.bind(this);
    this.delete = this.delete.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.create = this.create.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  updateNote(cartId: string, note: string) {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: String!, $note: String!) {
                    updateNoteForCart(cart_id: $cartId, note: $note) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          note
        })
        .then((result: { updateNoteForCart: any }) => {
          resolve(result.updateNoteForCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  removeCoupon(cartId: string, cartCouponId: string) {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: String!, $cartCouponId: String!) {
                    removeCouponFromCart(cart_id: $cartId, cart_coupon_id: $cartCouponId) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          cartCouponId
        })
        .then((result: { removeCouponFromCart: any }) => {
          resolve(result.removeCouponFromCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  applyCoupon(cartId: string, couponCode: string) {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: String!, $couponCode: String!) {
                    applyCouponToCart(cart_id: $cartId, coupon_code: $couponCode) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          couponCode
        })
        .then((result: { applyCouponToCart: any }) => {
          resolve(result.applyCouponToCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a cart
   * @param {string} cartId
   * @returns {Promise<any>}
   */
  delete(cartId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: String!) {
                    deleteCart(cart_id: $cartId)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId
        })
        .then((result: { deleteCart: any }) => {
          resolve(result.deleteCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Remove an item from currently active cart.
   * @param {string} cartId
   * @param {string} cartItemId
   * @returns {Promise<any>}
   */
  removeItem(cartId: string, cartItemId: string): Promise<any> {
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
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          cartItemId
        })
        .then((result: { removeItemFromCart: any }) => {
          resolve(result.removeItemFromCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Add an new item to currently active cart.
   * @param {string} cartId
   * @param {CartItem} item
   * @returns {Promise<any>}
   */
  addItem(cartId: string, item: CartItem): Promise<any> {
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
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          item
        })
        .then((result: { addItemCart: any }) => {
          resolve(result.addItemCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Create a new cart, remove all old carts.
   * @param {string} customerId
   * @param {string} vendorId
   * @returns {Promise<any>}
   */
  create(customerId: string, vendorId: string): Promise<any> {
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
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          customerId,
          vendorId
        })
        .then((result: { createCart: any }) => {
          resolve(result.createCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
module.exports = CartController;
