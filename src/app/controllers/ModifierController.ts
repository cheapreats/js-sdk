interface Choices {
  name: string;
  identifier: string;
  available: boolean;
  price: number;
}
interface AddModifier {
  name: string;
  identifier: string;
  description: string;
  required: boolean;
  choices: Array<Choices>;
  default: string;
  default_choices: Array<string>;
  menu_item_id: string;
  is_topping: boolean;
  max_choice?: number;
}
interface UpdateModifier {
  name?: string;
  identifier?: string;
  description?: string;
  required?: boolean;
  choices?: Array<Choices>;
  default?: string;
  default_choices?: Array<string>;
  is_topping?: boolean;
  max_choice?: number;
}
/**
 * Controller for modifiers.
 */
class ModifierController {
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
   * Create a new Modifier
   * @param {AddModifier} modifier - The Modifier Object
   * @returns {Promise<any>} - The id of the Modifier Object
   */
  create(modifier: AddModifier): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createModifier ($modifier: CreateModifierInput!) {
                    createModifier(modifier: $modifier) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          modifier
        })
        .then((result: { createModifier: { _id: any } }) => {
          resolve(result.createModifier._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing Modifier
   * @param {string} id - The id of the Modifier Object
   * @param {UpdateModifier} modifier - The Modifier Object
   * @returns {Promise<any>} - The id of the Modifier Object
   */
  update(id: string, modifier: UpdateModifier): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateModifier ($id: String!, $modifier: UpdateModifierInput!) {
                    updateModifier(id: $id, modifier: $modifier) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          modifier
        })
        .then((result: { updateModifier: { _id: any } }) => {
          resolve(result.updateModifier._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete an existing Modifier
   * @param {string} id - The id of the Modifier Object
   * @returns {Promise<any>}
   */
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteModifier ($id: String!) {
                    deleteModifier(id: $id)
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
        .catch(e => {
          reject(e);
        });
    });
  }
}

module.exports = ModifierController;
