/**
 * Controller for vendors.
 */
class VendorController {
    constructor(app) {
        this.app                           = app;
        // ADD BINDINGS BELOW
        this.deleteVendorTester            = this.deleteVendorTester.bind(this);
        this.addVendorTesterByEmailAddress = this.addVendorTesterByEmailAddress.bind(this);
        this.updateVendorApprovalStatus    = this.updateVendorApprovalStatus.bind(this);
        this.requestVendorApproval         = this.requestVendorApproval.bind(this);
        this.create                        = this.create.bind(this);
        this.update                        = this.update.bind(this);
        this.createWithEmployee            = this.createWithEmployee.bind(this);
        this.updateAllMenuItemsStatus      = this.updateAllMenuItemsStatus.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Delete a vendor tester by ID.
     * @param id Vendor tester's ID.
     * @returns {Promise<string>}
     */
    deleteVendorTester(id) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!) {
                    deleteVendorTester(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then((result) => {
                resolve(result.deleteVendorTester);
            }).catch(e => {
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
    addVendorTesterByEmailAddress(id, email_address) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!, $email_address: String!) {
                    addVendorTesterByEmailAddress(id: $id, email_address: $email_address) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, email_address
            }).then((result) => {
                resolve(result.addVendorTesterByEmailAddress);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update a vendor's approval status, this can only be called by master.
     * @param {string} id ID of the vendor.
     * @param {string} approval_status New approval status, can be APPROVED, PENDING, NOT_APPROVED
     * @returns {Promise<string>}
     */
    updateVendorApprovalStatus(id, approval_status) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!, $approval_status: VendorApprovalStatus!) {
                    updateVendorApprovalStatus(id: $id, approval_status: $approval_status) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, approval_status
            }).then((result) => {
                resolve(result.updateVendorApprovalStatus._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Request profile approval from administrators before publishing the store.
     * @param {string} id ID of the vendor.
     * @returns {Promise<any>}
     */
    requestVendorApproval(id) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!) {
                    requestVendorApproval(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then((result) => {
                resolve(result.requestVendorApproval);
            }).catch(e => {
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
    create(vendor) {
        console.warn("Vendor.create is deprecated, it is recommended for you to move to Vendor.createWithEmployee");
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createVendorMutation ($vendor: CreateVendorInput!) {
                    createVendor(vendor: $vendor) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                vendor
            }).then(result => {
                resolve(result.createVendor._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Create a new Vendor Object with an Employee Object
     * @param {Object} vendor - The Vendor Object
     * @returns {Promise<any>} - The id of the Vendor Object
     */
    createWithEmployee(vendor) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createVendorWithEmployeeMutation($vendor: CreateVendorWithEmployeeInput!) {
                    createVendorWithEmployee(vendor: $vendor) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                vendor
            }).then(result => {
                resolve(result.createVendorWithEmployee._id);
            }).catch(e => {
                reject(e);
            })
        })
    }

    /**
     * Update a vendor
     * @param {string} id - The id of the Vendor Object
     * @param {Object} vendor - The Vendor Object
     * @returns {Promise<any>}
     */
    update(id, vendor) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateVendorMutation ($id: String!, $vendor: UpdateVendorInput!) {
                    updateVendor(id: $id, vendor: $vendor) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, vendor
            }).then(result => {
                resolve(result.updateVendor._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update a vendor
     * @param {string} vendor_id - The id of the Vendor Object
     * @param {Object} status - Updated status of the items
     * @returns {Promise<any>}
     */
    updateAllMenuItemsStatus(vendor_id, status) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($vendor_id: String!, $status: String!) {
                    updateAllMenuItemsStatusForVendor(vendor_id: $vendor_id, status: $status)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                vendor_id, status
            }).then(result => {
                resolve(result.updateAllMenuItemsStatusForVendor);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = VendorController;
