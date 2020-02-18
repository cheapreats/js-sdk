enum OrderType {
  EAT_IN = "EAT_IN",
  TAKE_OUT = "TAKE_OUT"
}
enum CancelReason {
  VENDOR_CANCELLED = "VENDOR_CANCELLED",
  VENDOR_PREP_CANCELLED = "VENDOR_PREP_CANCELLED",
  VENDOR_ITEM_SOLD_OUT = "VENDOR_ITEM_SOLD_OUT",
  VENDOR_STORE_CLOSING_SOON = "VENDOR_STORE_CLOSING_SOON",
  CUSTOMER_NOT_PICKED_UP = "CUSTOMER_NOT_PICKED_UP",
  CUSTOMER_CANCELLED = "CUSTOMER_CANCELLED",
  OTHER = "OTHER"
}
interface Items {
  item_id: string;
  modifiers: Array<{ modifier_id: string; choices: Array<string> }>;
}
interface AddOrder {
  vendor_id: string;
  payment_method: string;
  items: Array<Items>;
  note?: string;
  coupons?: Array<string>;
  scheduled_pickup: string;
  order_type: OrderType;
}
/**
 * Controller for orders.
 */
class OrderController {
  app: any;
  constructor(app: any) {
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
   * @param {AddOrder} order - The Order Object
   * @param {Boolean} [dry] - Indicator for dry order placement
   * @param {Boolean} [clear_cart] - Indicator to clear all cart after order placement
   * @returns {Promise<any>} - The id of the Order Object
   */
  create(order: AddOrder, dry: boolean, clear_cart: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createOrderMutation ($order: CreateOrderInput!, $dry: Boolean, $clear_cart: Boolean) {
                    createOrder(order: $order, dry: $dry, clear_cart: $clear_cart) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          order,
          dry,
          clear_cart
        })
        .then((result: { createOrder: { _id: any } }) => {
          resolve(result.createOrder._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Cancel a order, must be authenticated as vendor
   * @param {string} id - The id of the Order Object
   * @param {CancelReason} reason - input type OrderCancellationReason enum indicating reason
   * @param {String} description - Additional details on order cancellation
   * @returns {Promise<any>}
   */
  cancel(
    id: string,
    reason: CancelReason,
    description: string | null = null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation cancelOrderMutation ($id: String!, $reason: OrderCancellationReason!, $description: String){
                    cancelOrder(id: $id, reason: $reason, description: $description){
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          reason,
          description
        })
        .then((result: any) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Set a order as preparing with estimated time
   * @param {string} id - The id of the Order Object
   * @param {number} estimated_preparing_sec - The amount of time the Order will take before it will be prepared
   * @returns {Promise<any>}
   */
  beginPreparing(id: string, estimated_preparing_sec: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation beginPreparingOrder($id: String!, $estimated_preparing_sec: Int!){
                    beginPreparingOrder(id: $id, estimated_preparing_sec: $estimated_preparing_sec){
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          estimated_preparing_sec
        })
        .then((result: any) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Set order as prepared
   * @param {string} id - The id of the Order Object
   * @returns {Promise<any>}
   */
  prepared(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation preparedOrderMutation ($id: String!){
                    preparedOrder (id: $id){
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: any) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Complete an order
   * @param {string} id - The id of the Order Object
   * @returns {Promise<any>}
   */
  complete(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation completeOrderMutation ($id: String!){
                    completeOrder(id: $id){
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: any) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = OrderController;
