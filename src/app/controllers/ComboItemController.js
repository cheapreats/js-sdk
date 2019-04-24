/**
 * Controller for combo items.
 */
class ComboItemController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Create a new combo item
     * @param  {string} name - Name of Combo Item
     * @param  {int} discount - Discount Applied to Original Value of Items
     * @param  {string} availableFrom - Starting Date of Availability
     * @param  {string} availableUntil - Ending Date of Availability
     * @param  {Object} menuItems
     * @param  {int} recurringType=null - Weekly, Monthly etc
     * @param  {string} dayOfWeek=null - The days of the week in which the combo is active (Monday or Tuesday etc)
     * @returns {Promise<any>} - Returns the id of the combo item object added
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
     * @param {int} id - The unique identifier of the combo item object
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
