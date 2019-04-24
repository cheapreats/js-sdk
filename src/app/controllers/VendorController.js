/**
 * Controller for vendors.
 */
class VendorController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.createWithEmployee = this.createWithEmployee.bind(this);
        this.updateAllMenuItemsStatus = this.updateAllMenuItemsStatus.bind(this);
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
