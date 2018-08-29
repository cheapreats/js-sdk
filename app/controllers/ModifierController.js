class ModifierController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
    }

    /**
     * Create a new Modifier
     * @param modifier
     * @returns {Promise<any>}
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
}

module.exports = ModifierController;