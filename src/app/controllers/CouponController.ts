interface PaymentMethods {
  apple_pay?: boolean;
  android_pay?: boolean;
  credit_card?: boolean;
  in_person?: boolean;
  wallet?: boolean;
}
interface AddCoupon {
  code: string;
  coupon_type: string;
  value: number;
  item_scope?: string;
  vendor_scope?: string;
  customer_scope?: string;
  uses: number;
  uses_per_customer: number;
  can_combine: boolean;
  carry_over: boolean;
  expire_at: string;
  paid_by_vendor: boolean;
  min_purchase: number;
  payment_methods?: PaymentMethods;
}

/**
 * Controller for coupons.
 */
class CouponController {
  app: any;
  constructor(app) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new coupon, return coupon ID if successful
   * @param {AddCoupon} category - The Coupon Object
   * @returns {Promise<any>}
   */
  create(coupon: AddCoupon): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createCouponMutation ($coupon: CreateCouponInput!) {
                    createCoupon(coupon: $coupon) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          coupon
        })
        .then((result: { createCoupon: { _id: unknown } }) => {
          resolve(result.createCoupon._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = CouponController;
