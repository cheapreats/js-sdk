/**
 * Controller for topping items.
 */
class ToppingItemController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new topping item
   * @param {string} name - The name of the Topping Object
   * @param {number} quantity - The amount of the Topping Object
   * @param {number} price - The cost of the Topping Object
   * @param {number} availableUntil - The length of time that this Topping Object is available
   * @returns {Promise<any>} - The id of the Topping Object
   */
  add(
    name: string,
    quantity: number,
    price: number,
    availableUntil: number
  ): Promise<any> {
    // addToppingItem(name: String!, quantity: Int!, price: Int!, availableUntil: Int!): ToppingItem
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation addToppingItemMutation ($name: String!, $quantity: Int!, $price: Int!, $availableUntil: Int!) {
                    addToppingItem(name: $name, quantity: $quantity, price: $price, availableUntil: $availableUntil) {
                        id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          name,
          quantity,
          price,
          availableUntil
        })
        .then((result: { addToppingItem: { id: any } }) => {
          resolve(result.addToppingItem.id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a topping item
   * @param {number} id - The id of the Topping Object
   * @param {string} name=null - The name of the Topping Object
   * @param {number} remainingQuantity=null - The amount of Toppings remaining
   * @param {number} availableUntil=null - The length of time that this Topping Object is available
   * @param toppingItems=null //PR why is topping items here but not in the query below?
   * @returns {Promise<any>} - The id of the Topping Object
   */
  update(
    id: number,
    name: string | null = null,
    remainingQuantity: number | null = null,
    availableUntil: number | null = null,
    toppingItems = null
  ): Promise<any> {
    // updateToppingItem(id: Int!, name: String, remainingQuantity: Int, price: Int, availableUntil: Int): ToppingItem
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateToppingItemMutation ($id: Int!, $name: String, $remainingQuantity: Int, $price: Int, $availableUntil: Int) {
                    updateToppingItem(id: $id, name: $name, remainingQuantity: $remainingQuantity, price: $price, availableUntil: $availableUntil) {
                        id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          name,
          remainingQuantity,
          availableUntil,
          toppingItems
        })
        .then((result: { updateToppingItem: { id: any } }) => {
          resolve(result.updateToppingItem.id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a topping item
   * @param {number} id - The id of the Topping Object
   * @returns {Promise<any>}
   */
  delete(id: number): Promise<any> {
    // deleteToppingItem(id: Int!): Int
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteToppingItemMutation ($id: Int!) {
                    deleteToppingItem(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then(() => {
          resolve();
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = ToppingItemController;
