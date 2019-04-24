/**
 * Controller for categories.
 */
class CategoryController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Create a new category, return category ID if successful
     * @param {Object} category - The category object
     * @returns {Promise<any>} - The id of the category that was created
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
     * @param {string} id - The category id that will be deleted
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
     * @param {string} id - The id of the category that will be updated
     * @param {Object} category - The updated category object
     * @returns {Promise<any>} - Returns the id of the updated category
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
