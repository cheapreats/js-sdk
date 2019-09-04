/**
 * Controller for vendors.
 */
class VendorController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.updateVendorApprovalStatus = this.updateVendorApprovalStatus.bind(this);
        this.requestVendorApproval = this.requestVendorApproval.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.createWithEmployee = this.createWithEmployee.bind(this);
        this.updateAllMenuItemsStatus = this.updateAllMenuItemsStatus.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Update a vendor's approval status, this can only be called by master.
     * @param {string} id ID of the vendor.
     * @param {boolean} is_approved New approval status.
     * @returns {Promise<string>}
     */
    updateVendorApprovalStatus(id, is_approved){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!, $is_approved: Boolean!) {
                    updateVendorApprovalStatus(id: $id, is_approved: $is_approved) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, is_approved
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
    requestVendorApproval(id){
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
    create(vendor){
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
    createWithEmployee(vendor){
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
    update(id, vendor){
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
    updateAllMenuItemsStatus(vendor_id, status){
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
