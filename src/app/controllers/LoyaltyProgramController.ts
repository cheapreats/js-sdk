enum ProgramType {
  DOLLAR = "DOLLAR",
  ORDER = "ORDER",
  ITEM = "ITEM"
}
interface LoyaltyProg {
  name: string;
  description?: string;
  vendor_id: string;
  items_required: Array<string>;
  points: number;
  shareable_points: number;
  min_purchase?: number;
  program_type?: ProgramType;
}
interface UpdateLoyaltyProg {
  name?: string;
  description?: string;
  items_required?: Array<string>;
  points?: number;
  shareable_points?: number;
  min_purchase?: number;
  program_type?: ProgramType;
}
/**
 * Controller for loyalty programs.
 */
class LoyaltyProgramController {
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
   * Create a new Loyalty Program, returns LoyaltyProgram _id if successful
   * @param {LoyaltyProg} loyalty_program - The LoyaltyProgram object input
   * @returns {Promise<any>} - The id of the LoyaltyProgram object
   */
  create(loyalty_program: LoyaltyProg): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($loyalty_program: CreateLoyaltyProgramInput!) {
                    createLoyaltyProgram(loyalty_program: $loyalty_program) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          loyalty_program
        })
        .then((result: { createLoyaltyProgram: { _id: any } }) => {
          resolve(result.createLoyaltyProgram._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing Loyalty Program, returns LoyaltyProgram _id if successful
   * @param {String} id - ID of the LoyaltyProgram object to update
   * @param {UpdateLoyaltyProg} loyalty_program - The LoyaltyProgram update object input
   * @returns {Promise<any>} - The id of the LoyaltyProgram object
   */
  update(id: string, loyalty_program: UpdateLoyaltyProg): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id:String!, $loyalty_program: UpdateLoyaltyProgramInput!) {
                    updateLoyaltyProgram(id:$id, loyalty_program: $loyalty_program) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          loyalty_program
        })
        .then((result: { updateLoyaltyProgram: { _id: any } }) => {
          resolve(result.updateLoyaltyProgram._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a Loyalty Program
   * @param {string} id - The id of the Loyalty Program
   * @returns {Promise<any>} - Return string
   */
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteLoyaltyProgram(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteLoyaltyProgram: any }) => {
          resolve(result.deleteLoyaltyProgram);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = LoyaltyProgramController;
