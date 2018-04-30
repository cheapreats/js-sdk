class ToppingItemController {
    constructor(app){
        this.app = app;
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new topping item
     * @param name
     * @param quantity
     * @param price
     * @param availableUntil
     * @returns {Promise<any>}
     */
    add(name, quantity, price, availableUntil){
        // addToppingItem(name: String!, quantity: Int!, price: Int!, availableUntil: Int!): ToppingItem
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation addToppingItemMutation ($name: String!, $quantity: Int!, $price: Int!, $availableUntil: Int!) {
                    addToppingItem(name: $name, quantity: $quantity, price: $price, availableUntil: $availableUntil) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                name, quantity, price, availableUntil
            }).then(result => {
                resolve(result.addToppingItem.id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update a topping item
     * @param id
     * @param name
     * @param remainingQuantity
     * @param availableUntil
     * @param toppingItems
     * @returns {Promise<any>}
     */
    update(id, name = null, remainingQuantity = null, availableUntil = null, toppingItems = null){
        // updateToppingItem(id: Int!, name: String, remainingQuantity: Int, price: Int, availableUntil: Int): ToppingItem
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateToppingItemMutation ($id: Int!, $name: String, $remainingQuantity: Int, $price: Int, $availableUntil: Int) {
                    updateToppingItem(id: $id, name: $name, remainingQuantity: $remainingQuantity, price: $price, availableUntil: $availableUntil) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, name, remainingQuantity, availableUntil, toppingItems
            }).then(result => {
                resolve(result.updateToppingItem.id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a topping item
     * @param id
     * @returns {Promise<any>}
     */
    delete(id){
        // deleteToppingItem(id: Int!): Int
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation deleteToppingItemMutation ($id: Int!) {
                    deleteToppingItem(id: $id)
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

module.exports = ToppingItemController;
