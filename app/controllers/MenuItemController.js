class MenuItemController {
    constructor(app){
        this.app = app;
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Add a new menu item
     * @param name
     * @param quantity
     * @param price
     * @param availableUntil
     * @param toppingItems
     * @returns {Promise<any>}
     */
    add(name, quantity, price, availableUntil, toppingItems = []){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation addMenuItemMutation ($name: String!, $quantity: Int!, $price: Int!, $availableUntil: Int!, $toppingItems: [ToppingItemInput]) {
                    addMenuItem(name: $name, quantity: $quantity, price: $price, availableUntil: $availableUntil, toppingItems: $toppingItems) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                name, quantity, price, availableUntil, toppingItems
            }).then(result => {
                resolve(result.addMenuItem.id);
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
     * @returns {Promise<any>}
     */
    update(id, name = null, remainingQuantity = null, price = null, availableUntil = null, toppingItems = null){
        // updateMenuItem(id: Int!, name: String, remainingQuantity: Int, price: Int, availableUntil: Int, toppingItems: [ToppingItemInput]): MenuItem
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateMenuItemMutation ($id: Int!, $name: String, $remainingQuantity: Int, $price: Int, $availableUntil: Int, $toppingItems: [ToppingItemInput]) {
                    updateMenuItem(id: $id, name: $name, remainingQuantity: $remainingQuantity, price: $price, availableUntil: $availableUntil, toppingItems: $toppingItems) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, name, remainingQuantity, price, availableUntil, toppingItems
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
