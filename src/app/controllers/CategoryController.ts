/**
 * Controller for categories.
 */
interface Category {
  name: string;
  identifier: string;
  description: string;
  vendor_id: string;
  sort_order?: number;
}
interface UpdateCategory {
  name?: string;
  identifier?: string;
  description?: string;
  sort_order?: number;
}
interface BatchCategories {
  id: string;
  category: UpdateCategory;
}

class CategoryController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.batchUpdate = this.batchUpdate.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new category, return category ID if successful
   * @param {Category} category - The category object
   * @returns {Promise<any>} - The id of the category that was created
   */
  create(category: Category): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createCategoryMutation ($category: CreateCategoryInput!) {
                    createCategory(category: $category) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          category
        })
        .then((result: { createCategory: { _id: any } }) => {
          resolve(result.createCategory._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a category
   * @param {string} id - The category id that will be deleted
   * @returns {Promise<any>}
   */
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteCategoryMutation ($id: String!) {
                    deleteCategory(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteCategory: any }) => {
          resolve(result.deleteCategory);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update category
   * @param {string} id - The id of the category that will be updated
   * @param {UpdateCategory} category - The updated category object
   * @returns {Promise<any>} - Returns the id of the updated category
   */
  update(id: string, category: UpdateCategory): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateCategoryMutation ($id: String!, $category: UpdateCategoryInput!) {
                    updateCategory(id: $id, category: $category) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          category
        })
        .then((result: { updateCategory: { _id: any } }) => {
          resolve(result.updateCategory._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Batch update a list of categories.
   * @param {Array<BatchCategories>} categories List of BatchUpdateCategoriesInput
   * @returns {Promise<any>} List of categories with _id field
   */
  batchUpdate(categories: Array<BatchCategories>): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($categories: [BatchUpdateCategoriesInput]!){
                    batchUpdateCategories(categories: $categories) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          categories
        })
        .then((result: { batchUpdateCategories: any }) => {
          resolve(result.batchUpdateCategories);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = CategoryController;
