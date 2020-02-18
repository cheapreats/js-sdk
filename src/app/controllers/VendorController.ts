interface AddVendorWithEmployee {
  name: string;
  email_address: string;
  username: string;
  password: string;
  plan: string;
}
enum ApprovalStatus {
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED"
}
enum PayoutSchedule {
  OFF = "OFF",
  WEEKLY = "WEEKLY",
  BI_WEEKLY = "BI_WEEKLY",
  MONTHLY = "MONTHLY"
}
interface UpdateVendor {
  name?: string;
  description?: string;
  images?: Array<string>;
  tags?: Array<{ name: string; identifier: string }>;
  open_hours?: {
    monday: Array<{ from: string; to: string }>;
    tuesday: Array<{ from: string; to: string }>;
    wednesday: Array<{ from: string; to: string }>;
    thursday: Array<{ from: string; to: string }>;
    friday: Array<{ from: string; to: string }>;
    saturday: Array<{ from: string; to: string }>;
    sunday: Array<{ from: string; to: string }>;
  };
  address?: string;
  phone_number?: string;
  location?: { longtitude: number; latitude: number };
  status?: string;
  payout_email_address?: string;
  direct_deposit_info?: {
    transit_no: string;
    institution_no: string;
    account_no: string;
    cheque_image: string;
  };
  payment_methods?: PaymentMethods;
  directions: string;
  receive_sms_notifications?: boolean;
  auto_open?: boolean;
  auto_close?: boolean;
  payout_auto_request_schedule?: PayoutSchedule;
  global_tax_rate?: number;
}
/**
 * Controller for vendors.
 */
class VendorController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.deleteVendorTester = this.deleteVendorTester.bind(this);
    this.addVendorTesterByEmailAddress = this.addVendorTesterByEmailAddress.bind(
      this
    );
    this.updateVendorApprovalStatus = this.updateVendorApprovalStatus.bind(
      this
    );
    this.requestVendorApproval = this.requestVendorApproval.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.createWithEmployee = this.createWithEmployee.bind(this);
    this.updateAllMenuItemsStatus = this.updateAllMenuItemsStatus.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Delete a vendor tester by ID.
   * @param {string} id Vendor tester's ID.
   * @returns {Promise<string>}
   */
  deleteVendorTester(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteVendorTester(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then(
          (result: { deleteVendorTester: string | PromiseLike<string> }) => {
            resolve(result.deleteVendorTester);
          }
        )
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Add a new vendor tester by email address.
   * @param {string} id Vendor's ID.
   * @param {string} email_address Customer's email address to add as a tester.
   * @returns {Promise<any>}
   */
  addVendorTesterByEmailAddress(
    id: string,
    email_address: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $email_address: String!) {
                    addVendorTesterByEmailAddress(id: $id, email_address: $email_address) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          email_address
        })
        .then((result: { addVendorTesterByEmailAddress: any }) => {
          resolve(result.addVendorTesterByEmailAddress);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a vendor's approval status, this can only be called by master.
   * @param {string} id ID of the vendor.
   * @param {ApprovalStatus} approval_status New approval status, can be APPROVED, PENDING, NOT_APPROVED
   * @returns {Promise<string>}
   */

  updateVendorApprovalStatus(
    id: string,
    approval_status: ApprovalStatus
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $approval_status: VendorApprovalStatus!) {
                    updateVendorApprovalStatus(id: $id, approval_status: $approval_status) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          approval_status
        })
        .then(
          (result: {
            updateVendorApprovalStatus: { _id: string | PromiseLike<string> };
          }) => {
            resolve(result.updateVendorApprovalStatus._id);
          }
        )
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Request profile approval from administrators before publishing the store.
   * @param {string} id ID of the vendor.
   * @returns {Promise<any>}
   */
  requestVendorApproval(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    requestVendorApproval(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { requestVendorApproval: any }) => {
          resolve(result.requestVendorApproval);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * TODO: Deprecate this method
   * Create a new vendor, return vendor ID if successful
   * @param {Object} vendor - The Vendor Object
   * @returns {Promise<any>}
   */
  create(vendor: any): Promise<any> {
    console.warn(
      "Vendor.create is deprecated, it is recommended for you to move to Vendor.createWithEmployee"
    );
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createVendorMutation ($vendor: CreateVendorInput!) {
                    createVendor(vendor: $vendor) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor
        })
        .then((result: { createVendor: { _id: any } }) => {
          resolve(result.createVendor._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Create a new Vendor Object with an Employee Object
   * @param {AddVendorWithEmployee} vendor - The Vendor Object
   * @returns {Promise<any>} - The id of the Vendor Object
   */
  createWithEmployee(vendor: AddVendorWithEmployee): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createVendorWithEmployeeMutation($vendor: CreateVendorWithEmployeeInput!) {
                    createVendorWithEmployee(vendor: $vendor) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor
        })
        .then((result: { createVendorWithEmployee: { _id: any } }) => {
          resolve(result.createVendorWithEmployee._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a vendor
   * @param {string} id - The id of the Vendor Object
   * @param {UpdateVendor} vendor - The Vendor Object
   * @returns {Promise<any>}
   */
  update(id: string, vendor: UpdateVendor): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateVendorMutation ($id: String!, $vendor: UpdateVendorInput!) {
                    updateVendor(id: $id, vendor: $vendor) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          vendor
        })
        .then((result: { updateVendor: { _id: any } }) => {
          resolve(result.updateVendor._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a vendor
   * @param {string} vendor_id - The id of the Vendor Object
   * @param {string} status - Updated status of the items
   * @returns {Promise<any>}
   */
  updateAllMenuItemsStatus(vendor_id: string, status: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($vendor_id: String!, $status: String!) {
                    updateAllMenuItemsStatusForVendor(vendor_id: $vendor_id, status: $status)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          status
        })
        .then((result: { updateAllMenuItemsStatusForVendor: any }) => {
          resolve(result.updateAllMenuItemsStatusForVendor);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = VendorController;
