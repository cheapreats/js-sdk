class CategoryController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }


    /**
     * Create a new category, return category ID if successful
     * @param category
     * @returns {Promise<any>}
     */
    create(category){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createCategoryMutation ($category: CreateCategoryInput!) {
                    createCategory(category: $category) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                category
            }).then(result => {
                resolve(result.createCategory._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a category
     * @param id
     * @returns {Promise<any>}
     */
    delete(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation deleteCategoryMutation ($id: String!) {
                    deleteCategory(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then(result => {
                resolve(result.deleteCategory);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update category
     * @param id
     * @param category
     * @returns {Promise<any>}
     */
    update(id, category){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateCategoryMutation ($id: String!, $category: UpdateCategoryInput!) {
                    updateCategory(id: $id, category: $category) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, category
            }).then(result => {
                resolve(result.updateCategory._id);
            }).catch(e => {
                reject(e);
            });
        })
    }

}

module.exports = CategoryController;
