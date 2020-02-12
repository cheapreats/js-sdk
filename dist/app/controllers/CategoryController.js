"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for categories.
 */
var CategoryController = function () {
    function CategoryController(app) {
        _classCallCheck(this, CategoryController);

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
     * @param {Object} category - The category object
     * @returns {Promise<any>} - The id of the category that was created
     */


    _createClass(CategoryController, [{
        key: "create",
        value: function create(category) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation createCategoryMutation ($category: CreateCategoryInput!) {\n                    createCategory(category: $category) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    category: category
                }).then(function (result) {
                    resolve(result.createCategory._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Delete a category
         * @param {string} id - The category id that will be deleted
         * @returns {Promise<any>}
         */

    }, {
        key: "delete",
        value: function _delete(id) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation deleteCategoryMutation ($id: String!) {\n                    deleteCategory(id: $id)\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.deleteCategory);
                }).catch(function (e) {
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

    }, {
        key: "update",
        value: function update(id, category) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation updateCategoryMutation ($id: String!, $category: UpdateCategoryInput!) {\n                    updateCategory(id: $id, category: $category) {\n                        _id\n                    }\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id, category: category
                }).then(function (result) {
                    resolve(result.updateCategory._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Batch update a list of categories.
         * @param categories List of BatchUpdateCategoriesInput
         * @returns {Promise<any>} List of categories with _id field
         */

    }, {
        key: "batchUpdate",
        value: function batchUpdate(categories) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($categories: [BatchUpdateCategoriesInput]!){\n                    batchUpdateCategories(categories: $categories) {\n                        _id\n                    }\n                }\n            ";
                _this4.app.getAdaptor().mutate(mutationString, {
                    categories: categories
                }).then(function (result) {
                    resolve(result.batchUpdateCategories);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return CategoryController;
}();

module.exports = CategoryController;