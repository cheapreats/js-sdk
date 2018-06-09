class HeadOfficeController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    /**
     * Create a new HeadOffice
     * @param identifier
     * @returns {Promise<any>}
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
     * @param id
     * @param identifier
     * @returns {Promise<any>}
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
}

module.exports = HeadOfficeController;
