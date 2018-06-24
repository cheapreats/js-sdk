class CategoryController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
    }


    /**
     * Create a new category, return category ID if successful
     * @param category
     * @returns {Promise<any>}
     */
    create(category){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createCategoryMutation ($category: CreateCategoryInput) {
                    createCategory(category: $category) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                category
            }).then(result => {
                resolve(result.createCategoryMutation._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = CategoryController;
