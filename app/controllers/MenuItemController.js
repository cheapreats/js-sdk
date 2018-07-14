class MenuItemController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new MenuItem, returns MenuItem _id if successful
     * @param menu_item
     * @returns {Promise<any>}
     */
    create(menu_item){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createMenuItemMutation ($menu_item: CreateMenuItemInput!) {
                    createMenuItem(menu_item: $menu_item) {
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
     * Update an existing MenuItem based on given ID/menu_item, returns _id if successful
     * @param id
     * @param menu_item
     * @returns {Promise<any>}
     */
    update(id, menu_item){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateMenuItemMutation ($id: String!, $menu_item: UpdateMenuItemInput!) {
                    updateMenuItem(id: $id, menu_item: $menu_item) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, menu_item
            }).then(result => {
                resolve(result.updateMenuItem._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a MenuItem
     * @param id
     * @returns {Promise<any>}
     */
    delete(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation deleteMenuItemMutation ($id: String!) {
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
