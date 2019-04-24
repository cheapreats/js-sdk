/**
 * Controller for modifiers.
 */
class ModifierController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Create a new Modifier
     * @param {Object} modifier - The Modifier Object
     * @returns {Promise<any>} - The id of the Modifier Object
     */
    create(modifier){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createModifier ($modifier: CreateModifierInput!) {
                    createModifier(modifier: $modifier) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                modifier
            }).then(result => {
                resolve(result.createModifier._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update an existing Modifier
     * @param {string} id - The id of the Modifier Object
     * @param {Object} modifier - The Modifier Object
     * @returns {Promise<any>} - The id of the Modifier Object
     */
    update(id, modifier) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateModifier ($id: String!, $modifier: UpdateModifierInput!) {
                    updateModifier(id: $id, modifier: $modifier) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, modifier
            }).then(result => {
                resolve(result.updateModifier._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete an existing Modifier
     * @param {string} id - The id of the Modifier Object
     * @returns {Promise<any>}
     */
    delete(id) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation deleteModifier ($id: String!) {
                    deleteModifier(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then(() => {
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }
}

module.exports = ModifierController;
