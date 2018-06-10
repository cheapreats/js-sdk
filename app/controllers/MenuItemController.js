class MenuItemController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new customer, return customer ID if successful
     * @param customer
     * @returns {Promise<any>}
     */
    create(menu_item){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation CreateMenuItemMutation ($menu_item: CreateMenuItemInput!) {
                    CreateMenuItem(menu_item: $menu_item) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                menu_item
            }).then(result => {
                resolve(result.createMenuItem._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update a menu item
     * @param id
     * @param name
     * @param remainingQuantity
     * @param price
     * @param availableUntil
     * @param toppingItems
     * @param metaData
     * @returns {Promise<any>}
     */
    update(id, name = null, remainingQuantity = null, price = null, availableUntil = null, toppingItems = null, metaData = null){
        // updateMenuItem(id: Int!, name: String, remainingQuantity: Int, price: Int, availableUntil: Int, toppingItems: [ToppingItemInput]): MenuItem
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateMenuItemMutation ($id: Int!, $name: String, $remainingQuantity: Int, $price: Int, $availableUntil: Int, $toppingItems: [ToppingItemInput], $metaData: MenuItemMetaDataInput) {
                    updateMenuItem(id: $id, name: $name, remainingQuantity: $remainingQuantity, price: $price, availableUntil: $availableUntil, toppingItems: $toppingItems, metaData: $metaData) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, name, remainingQuantity, price, availableUntil, toppingItems, metaData
            }).then(result => {
                resolve(result.updateMenuItem.id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a menu item
     * @param id
     * @returns {Promise<any>}
     */
    delete(id){
        // deleteMenuItem(id: Int!): Int
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation deleteMenuItemMutation ($id: Int!) {
                    deleteMenuItem(id: $id)
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

module.exports = MenuItemController;
