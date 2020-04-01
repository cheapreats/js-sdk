/**
 * Controller for coupons.
 */
class CouponController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
		this.update = this.update.bind(this);
    }

    // ADD MUTATION METHODS BELOW

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

    /**
     * Update a coupon
     * @param {string} id - The id of the Coupon Object
     * @param {Object} updateFields - Coupon fields to update
     * @returns {Promise<*>} - The id of the Coupon Object
     */
    async update(id, updateFields) {
        const mutationString = `
            mutation updateCouponMutation ($id: String!, $coupon: UpdateCouponInput!) {
                updateCoupon(id: $id, coupon: $coupon) {
                    _id
                }
            }
        `;

        try {
            let result = await this.app.getAdaptor().mutate(mutationString, {
                id,
                coupon: updateFields
            });
            return result.updateCoupon._id;
        } catch(e) {
            throw new Error(e);
        }
    }
}

module.exports = CouponController;
