class ComboItemController {
    constructor(app){
        this.app = app;
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new combo item
     * @param name
     * @param discount
     * @param availableFrom
     * @param availableUntil
     * @param menuItems
     * @param recurringType
     * @param dayOfWeek
     * @returns {Promise<any>}
     */
    add(name, discount, availableFrom, availableUntil, menuItems, recurringType = null, dayOfWeek = null){
        // addComboItem(name: String!, discount: Int!, availableFrom: String, availableUntil: String, menuItems: [ComboItemInput]!, recurringType: Int, dayOfWeek: String): ComboItem
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation addComboItemMutation ($name: String!, $discount: Int!, $availableFrom: String!, $availableUntil: String!, $menuItems: [ComboItemInput]!, $recurringType: Int, $dayOfWeek: String) {
                    addComboItem(name: $name, discount: $discount, availableFrom: $availableFrom, availableUntil: $availableUntil, menuItems: $menuItems, recurringType: $recurringType, dayOfWeek: $dayOfWeek) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                name, discount, availableFrom, availableUntil, menuItems, recurringType, dayOfWeek
            }).then(result => {
                resolve(result.addComboItem.id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a combo item
     * @param id
     * @returns {Promise<any>}
     */
    delete(id){
        // deleteComboItem(id: Int!): Int
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation deleteComboItemMutation ($id: Int!) {
                    deleteComboItem(id: $id)
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

module.exports = ComboItemController;
