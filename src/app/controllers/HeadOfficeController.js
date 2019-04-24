/**
 * Controller for head offices.
 */
class HeadOfficeController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new HeadOffice
     * @param {string} identifier - The identifier for the Head Office Object
     * @returns {Promise<any>} - The id of the Head Office object
     */
    create(identifier){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createHeadOffice ($identifier: String!) {
                    createHeadOffice(identifier: $identifier) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                identifier
            }).then(result => {
                resolve(result.createHeadOffice._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update a HeadOffice
     * @param {string} id - The id of the Head Office Object
     * @param {string} identifier - The identifier for the Head Office Object
     * @returns {Promise<any>} - The id of the Head Office object
     */
    update(id, identifier){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateHeadOffice ($id: String!, $identifier: String!) {
                    updateHeadOffice(id: $id, identifier: $identifier) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, identifier
            }).then(result => {
                resolve(result.updateHeadOffice._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a HeadOffice instance
     * @param {string} id - The id of the Head Office Object
     * @returns {Promise<any>}
     */
    delete(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation deleteHeadOffice ($id: String!) {
                    deleteHeadOffice(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then(result => {
                resolve(result.deleteHeadOffice);
            }).catch(e => {
                reject(e);
            });
        })
    }
}

module.exports = HeadOfficeController;
