interface AddRedeemableItem {
  loyalty_program_id: string;
  menu_item_id: string;
  points_required: number;
}
interface UpdateRedeemableItem {
  points_required?: number;
}
/**
 * Controller for redeemable items.
 */
class RedeemableItemController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new Redeemable Item, returns RedeemableItem _id if successful
   * @param {AddRedeemableItem} redeemable_item - The RedeemableItem object input
   * @returns {Promise<any>} - The id of the RedeemableItem object
   */
  create(redeemable_item: AddRedeemableItem): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createRedeemableItem ($redeemable_item: CreateRedeemableItemInput!) {
                    createRedeemableItem(redeemable_item: $redeemable_item) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          redeemable_item
        })
        .then((result: { createRedeemableItem: { _id: any } }) => {
          resolve(result.createRedeemableItem._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing RedeemableItem, returns RedeemableItem _id if successful
   * @param {string} id - ID of the RedeemableItem object to update
   * @param {UpdateRedeemableItem} redeemable_item - The RedeemableItem update object input
   * @returns {Promise<any>} - The id of the RedeemableItem object
   */
  update(id: string, redeemable_item: UpdateRedeemableItem): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id:String!, $redeemable_item: UpdateRedeemableItemInput!) {
                    updateRedeemableItem(id: $id, redeemable_item: $redeemable_item) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          redeemable_item
        })
        .then((result: { updateRedeemableItem: { _id: any } }) => {
          resolve(result.updateRedeemableItem._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a RedeemableItem
   * @param {string} id - The id of the RedeemableItem
   * @returns {Promise<any>} - Return string
   */
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteRedeemableItem(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteRedeemableItem: any }) => {
          resolve(result.deleteRedeemableItem);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = RedeemableItemController;
