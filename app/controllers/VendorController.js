class VendorController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }


    /**
     * Create a new vendor, return vendor ID if successful
     * @param vendor
     * @returns {Promise<any>}
     */
    create(vendor){
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
     * Update a vendor
     * @param id
     * @param vendor
     * @returns {Promise<any>}
     */
    update(id, vendor){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateVendorMutation ($id: String!, $vendor: CreateVendorInput!) {
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

}

module.exports = VendorController;
