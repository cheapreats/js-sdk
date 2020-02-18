interface CustomerOptions {
  profile_picture?: string;
  birthday?: string;
}
interface EmailPref {
  promotional: boolean;
  transactional: boolean;
  system: boolean;
}
interface AddCustomer extends CustomerOptions {
  email_address: string;
  name: string;
  password: string;
  phone_number: string;
  verification_request_id: string;
  verification_code: string;
  email_preferences: EmailPref;
}
interface UpdateCustomer extends CustomerOptions {
  mobile_notifications?: boolean;
  email_preferences?: EmailPref;
}
/**
 * Controller for customers.
 */
class CustomerController {
  app: any;
  constructor(app) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.updateCreditCard = this.updateCreditCard.bind(this);
    this.enrollApnsToken = this.enrollApnsToken.bind(this);
    this.revokeApnsToken = this.revokeApnsToken.bind(this);
    this.enrollFcmToken = this.enrollFcmToken.bind(this);
    this.revokeFcmToken = this.revokeFcmToken.bind(this);
    this.createWallet = this.createWallet.bind(this);
    this.reloadWallet = this.reloadWallet.bind(this);
    this.sendPasswordResetCode = this.sendPasswordResetCode.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.refundWallet = this.refundWallet.bind(this);
    this.createWalletTransaction = this.createWalletTransaction.bind(this);
    this.addFavouriteVendor = this.addFavouriteVendor.bind(this);
    this.removeFavouriteVendor = this.removeFavouriteVendor.bind(this);
    this.addFavouriteItem = this.addFavouriteItem.bind(this);
    this.removeFavouriteItem = this.removeFavouriteItem.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new customer, return customer ID if successful
   * @param {AddCustomer} customer - The Customer object to be created
   * @returns {Promise<any>} - The id of the Customer object that was created
   */
  create(customer: AddCustomer): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createCustomerMutation ($customer: CreateCustomerInput!) {
                    createCustomer(customer: $customer) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          customer
        })
        .then((result: { createCustomer: { _id: any } }) => {
          resolve(result.createCustomer._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a customer
   * @param {string} id - The id of the Customer object
   * @param {UpdateCustomer} customer - The updated Customer object
   * @returns {Promise<any>} - The id of the Customer Object that was updated
   */
  update(id: string, customer: UpdateCustomer): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateCustomerMutation ($id: String!, $customer: UpdateCustomerInput!) {
                    updateCustomer(id: $id, customer: $customer) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          customer
        })
        .then((result: { updateCustomer: { _id: any } }) => {
          resolve(result.updateCustomer._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Enroll a new APNs token
   * @param {string} id - The id of the Customer Object
   * @param {string} token - The APNS Token
   * @returns {Promise<any>}
   */
  enrollApnsToken(id: string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation enrollCustomerApnsTokenMutation ($id: String!, $token: String!) {
                    enrollCustomerApnsToken(id: $id, token: $token) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          token
        })
        .then((result: { enrollCustomerApnsToken: any }) => {
          resolve(result.enrollCustomerApnsToken);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Revoke an APNs token
   * @param {string} id - The id of the Customer Object
   * @param {string} token - The APNS Token
   * @returns {Promise<any>}
   */
  revokeApnsToken(id: string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation revokeCustomerApnsTokenMutation ($id: String!, $token: String!) {
                    revokeCustomerApnsToken(id: $id, token: $token) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          token
        })
        .then((result: { revokeCustomerApnsToken: any }) => {
          resolve(result.revokeCustomerApnsToken);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Enroll a new FCM token
   * @param {string} id - The id of the Customer Object
   * @param {string} token - The FCM Token
   * @returns {Promise<any>}
   */
  enrollFcmToken(id: string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation enrollCustomerFcmTokenMutation ($id: String!, $token: String!) {
                    enrollCustomerFcmToken(id: $id, token: $token) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          token
        })
        .then((result: { enrollCustomerFcmToken: any }) => {
          resolve(result.enrollCustomerFcmToken);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Revoke an FCM token
   * @param {string} id - The id of the Customer Object
   * @param {string} token - The FCM Token
   * @returns {Promise<any>}
   */
  revokeFcmToken(id: string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation revokeCustomerFcmTokenMutation ($id: String!, $token: String!) {
                    revokeCustomerFcmToken(id: $id, token: $token) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          token
        })
        .then((result: { revokeCustomerFcmToken: any }) => {
          resolve(result.revokeCustomerFcmToken);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a customer's credit card
   * @param {string} id - The id of the Customer Object
   * @param {string} token - The Stripe Token
   * @returns {Promise<any>}
   */
  updateCreditCard(id: string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateCustomerCreditCardMutation ($id: String!, $token: String!) {
                    updateCustomerCreditCard(id: $id, token: $token) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          token
        })
        .then((result: { updateCustomerCreditCard: any }) => {
          resolve(result.updateCustomerCreditCard);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Create Customer Wallet
   * @param {string} id - The id of the Customer Object
   * @returns {Promise<any>} - The id of the wallet that was created
   */
  createWallet(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createCustomerWallet ($id: String!) {
                    createCustomerWallet(id: $id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { createCustomerWallet: { _id: any } }) => {
          resolve(result.createCustomerWallet._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Reload customer wallet
   * @param {string} id - The id of the Customer Object
   * @param  {number} amount - The amount to load the wallet (in cents)
   * @param  {string} payment_method - The selected payment method
   * @returns {Promise<any>} - The id of the wallet that was reloaded
   */
  reloadWallet(
    id: string,
    amount: number,
    payment_method: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation reloadCustomerWallet ($id: String!, $amount: Int!, $payment_method: String!) {
                    reloadCustomerWallet(id: $id, amount: $amount, payment_method: $payment_method) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          amount,
          payment_method
        })
        .then((result: { reloadCustomerWallet: { _id: any } }) => {
          resolve(result.reloadCustomerWallet._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Send password reset code to customer
   * @param  {string} email_address - The email address of the customer
   * @param  {Method} method - The method to receive the code on, either EMAIL (default) or SMS
   */
  sendPasswordResetCode(email_address: string, method: Method = Method.EMAIL) {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation sendCustomerPasswordResetCode ($email_address: String!, $method: ResetCodeSendMethod) {
                    sendCustomerPasswordResetCode(email_address: $email_address, method:$method)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          email_address,
          method
        })
        .then((result: { sendCustomerPasswordResetCode: any }) => {
          resolve(result.sendCustomerPasswordResetCode);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Reset Customer Password
   * @param  {string} email_address - The email address of the customer
   * @param  {string} code - Temporary Code for Password Resets
   * @param  {string} password - The new password
   */
  resetPassword(email_address: string, code: string, password: string) {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation resetCustomerPassword ($email_address: String!, $code: String!, $password: String!) {
                    resetCustomerPassword(email_address: $email_address, code: $code, password: $password) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          email_address,
          code,
          password
        })
        .then((result: { resetCustomerPassword: { _id: any } }) => {
          resolve(result.resetCustomerPassword._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Refund customer wallet by vendor
   * @param {string} id - The id of the Customer
   * @param  {string} vendor_id - ID of the Vendor issuing the refund
   * @param  {number} amount - The amount to refund the wallet (in cents)
   * @param  {String} order_id - Optional orderId selected payment method
   * @returns {Promise<any>} - The id of the wallet that was reloaded
   */
  refundWallet(
    id: string,
    vendor_id: string,
    amount: number,
    order_id: string | null = null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $vendor_id: String!, $amount: Int!, $order_id: String) {
                    refundCustomerWallet(id: $id, vendor_id: $vendor_id, amount: $amount, order_id: $order_id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          vendor_id,
          amount,
          order_id
        })
        .then((result: { refundCustomerWallet: { _id: any } }) => {
          resolve(result.refundCustomerWallet._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Create a wallet transaction for customer
   * @param {string} id - The id of the Customer
   * @param  {string} transaction_type - Transaction type, either 'reload' or 'purchase'
   * @param  {number} amount - The amount in cents
   * @param  {string} description - Optional description for transaction
   * @returns {Promise<any>} - The id of the wallet that was reloaded
   */
  createWalletTransaction(
    id: string,
    transaction_type: string,
    amount: number,
    description: string | null = null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $transaction_type: String!, $amount: Int!, $description: String) {
                    createCustomerWalletTransaction(id: $id, transaction_type: $transaction_type, amount: $amount, description: $description) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          transaction_type,
          amount,
          description
        })
        .then((result: { createCustomerWalletTransaction: { _id: any } }) => {
          resolve(result.createCustomerWalletTransaction._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Add a favourite vendor for customer
   * @param {string} id - The id of the Customer
   * @param  {string} vendor_id - The id of the vendor
   * @returns {Promise<any>} - The id of customer whose favourite vendor was updated
   */
  addFavouriteVendor(id: string, vendor_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $vendor_id: String!) {
                    addFavouriteVendorForCustomer (id: $id, vendor_id: $vendor_id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          vendor_id
        })
        .then((result: { addFavouriteVendorForCustomer: { _id: any } }) => {
          resolve(result.addFavouriteVendorForCustomer._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Remove a favourite vendor for customer
   * @param {string} id - The id of the Customer
   * @param  {string} vendor_id - The id of the vendor
   * @returns {Promise<any>} - The id of customer whose favourite vendor was updated
   */
  removeFavouriteVendor(id: string, vendor_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $vendor_id: String!) {
                    removeFavouriteVendorForCustomer (id: $id, vendor_id: $vendor_id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          vendor_id
        })
        .then((result: { removeFavouriteVendorForCustomer: { _id: any } }) => {
          resolve(result.removeFavouriteVendorForCustomer._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Add a favourite item for customer
   * @param {string} id - The id of the Customer
   * @param  {string} item_id - The id of the item
   * @returns {Promise<any>} - The id of customer whose favourite item was updated
   */
  addFavouriteItem(id: string, item_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $item_id: String!) {
                    addFavouriteItemForCustomer (id: $id, item_id: $item_id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          item_id
        })
        .then((result: { addFavouriteItemForCustomer: { _id: any } }) => {
          resolve(result.addFavouriteItemForCustomer._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Remove a favourite item for customer
   * @param {string} id - The id of the Customer
   * @param  {string} item_id - The id of the item
   * @returns {Promise<any>} - The id of customer whose favourite item was updated
   */
  removeFavouriteItem(id: string, item_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id:String!, $item_id:String!) {
                    removeFavouriteItemForCustomer (id:$id, item_id:$item_id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          item_id
        })
        .then((result: { removeFavouriteItemForCustomer: { _id: any } }) => {
          resolve(result.removeFavouriteItemForCustomer._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = CustomerController;
