interface AddMenuItem {
  name: string;
  identifier: string;
  images: Array<string>;
  calories: number;
  tags: Array<{ name: string; identifier: string }>;
  ingredients: Array<{ name: string; identifier: string }>;
  fees: Array<{ name: string; fee_type: string; amount: number }>;
  recycle_info: string;
  description: string;
  daily_special_day?: string;
  price: number;
  original_price: number;
  status: string;
  warning_label?: string;
  category_id: string;
  sort_order?: number;
  estimated_time?: number;
}
interface UpdateMenuItem {
  name?: string;
  identifier?: string;
  images?: Array<string>;
  calories?: number;
  tags?: Array<{ name: string; identifier: string }>;
  ingredients?: Array<{ name: string; identifier: string }>;
  fees?: Array<{ name: string; fee_type: string; amount: number }>;
  recycle_info?: string;
  description?: string;
  daily_special_day?: string;
  price?: number;
  original_price?: number;
  status?: string;
  warning_label?: string;
  sort_order?: number;
  estimated_time?: number;
}
interface BatchUpdate {
  id: string;
  menu_item: UpdateMenuItem;
}
/**
 * Controller for menu items.
 */
class MenuItemController {
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
   * Create a new MenuItem, returns MenuItem _id if successful
   * @param {AddMenuItem} menu_item - The MenuItem object
   * @returns {Promise<any>} - The id of the MenuItem object
   */
  create(menu_item: AddMenuItem): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createMenuItemMutation ($menu_item: CreateMenuItemInput!) {
                    createMenuItem(menu_item: $menu_item) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          menu_item
        })
        .then((result: { createMenuItem: { _id: any } }) => {
          resolve(result.createMenuItem._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing MenuItem based on given ID/menu_item, returns _id if successful
   * @param {string} id - The id of the MenuItem Object
   * @param {UpdateMenuItem} menu_item - The MenuItem Object
   * @returns {Promise<any>} - The id of the MenuItem object
   */
  update(id: string, menu_item: UpdateMenuItem): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateMenuItemMutation ($id: String!, $menu_item: UpdateMenuItemInput!) {
                    updateMenuItem(id: $id, menu_item: $menu_item) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          menu_item
        })
        .then((result: { updateMenuItem: { _id: any } }) => {
          resolve(result.updateMenuItem._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Batch update a list of menu items.
   * @param {Array<BatchUpdate>} menu_items List of BatchUpdateMenuItemsInput
   * @returns {Promise<any>} List of menu items with _id field
   */
  batchUpdate(menu_items: Array<BatchUpdate>): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation batchUpdateMenuItems ($menu_items: [BatchUpdateMenuItemsInput]!) {
                    batchUpdateMenuItems(menu_items: $menu_items) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          menu_items
        })
        .then((result: { batchUpdateMenuItems: any }) => {
          resolve(result.batchUpdateMenuItems);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a MenuItem
   * @param {string} id - The id of the MenuItem Object
   * @returns {Promise<any>} - The id of the MenuItem object
   */
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteMenuItemMutation ($id: String!) {
                    deleteMenuItem(id: $id)
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

module.exports = MenuItemController;
