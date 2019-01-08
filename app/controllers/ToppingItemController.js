/**
 * Controller for topping items.
 */
class ToppingItemController {
    constructor(app){
        this.app = app;
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new topping item
     * @param {string} name - The name of the Topping Object
     * @param {int} quantity - The amount of the Topping Object
     * @param {int} price - The cost of the Topping Object
     * @param {int} availableUntil - The length of time that this Topping Object is available
     * @returns {Promise<any>} - The id of the Topping Object
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
     * @param {int} id - The id of the Topping Object
     * @param {string} name=null - The name of the Topping Object
     * @param {int} remainingQuantity=null - The amount of Toppings remaining
     * @param {int} availableUntil=null - The length of time that this Topping Object is available
     * @param toppingItems=null
     * @returns {Promise<any>} - The id of the Topping Object
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
     * @param {int} id - The id of the Topping Object
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
