/**
 * Controller for head offices.
 */
class HeadOfficeController {
  app: any;
  constructor(app) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new HeadOffice
   * @param {string} identifier - The identifier for the Head Office Object
   * @returns {Promise<any>} - The id of the Head Office object
   */
  create(identifier: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createHeadOffice ($identifier: String!) {
                    createHeadOffice(identifier: $identifier) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          identifier
        })
        .then((result: { createHeadOffice: { _id: any } }) => {
          resolve(result.createHeadOffice._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a HeadOffice
   * @param {string} id - The id of the Head Office Object
   * @param {string} identifier - The identifier for the Head Office Object
   * @returns {Promise<any>} - The id of the Head Office object
   */
  update(id: string, identifier: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateHeadOffice ($id: String!, $identifier: String!) {
                    updateHeadOffice(id: $id, identifier: $identifier) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          identifier
        })
        .then((result: { updateHeadOffice: { _id: any } }) => {
          resolve(result.updateHeadOffice._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a HeadOffice instance
   * @param {string} id - The id of the Head Office Object
   * @returns {Promise<any>}
   */
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteHeadOffice ($id: String!) {
                    deleteHeadOffice(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteHeadOffice: any }) => {
          resolve(result.deleteHeadOffice);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = HeadOfficeController;
