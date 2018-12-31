class CouponController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
    }

    /**
     * Create a new coupon, return coupon ID if successful
     * @param {Object} category - The Coupon Object
     * @returns {Promise<any>}
     */
    create(coupon){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createCouponMutation ($coupon: CreateCouponInput!) {
                    createCoupon(coupon: $coupon) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                coupon
            }).then(result => {
                resolve(result.createCoupon._id);
            }).catch(e => {
                reject(e);
            });
        });
    }
}

module.exports = CouponController;
