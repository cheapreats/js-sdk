/**
 * Controller for loyalty programs.
 */
class LoyaltyProgramController {
    constructor(app){
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    /**
     * Create a new Loyalty Program, returns LoyaltyProgram _id if successful
     * @param {Object} loyalty_program - The LoyaltyProgram object input
     * @returns {Promise<any>} - The id of the LoyaltyProgram object
     */
    create(loyalty_program){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($loyalty_program: CreateLoyaltyProgramInput!) {
                    createLoyaltyProgram(loyalty_program: $loyalty_program) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                loyalty_program
            }).then(result => {
                resolve(result.createLoyaltyProgram._id);
            }).catch(e => {
                reject(e);
            });
        });
    }


    /**
     * Update an existing Loyalty Program, returns LoyaltyProgram _id if successful
     * @param {Object} id - ID of the LoyaltyProgram object to update
     * @param {Object} loyalty_program - The LoyaltyProgram update object input
     * @returns {Promise<any>} - The id of the LoyaltyProgram object
     */
    update(id, loyalty_program){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id:String!, $loyalty_program: UpdateLoyaltyProgramInput!) {
                    updateLoyaltyProgram(id:$id, loyalty_program: $loyalty_program) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, loyalty_program
            }).then(result => {
                resolve(result.updateLoyaltyProgram._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a Loyalty Program
     * @param {string} id - The id of the Loyalty Program
     * @returns {Promise<any>} - Return string
     */
    delete(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!) {
                    deleteLoyaltyProgram(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then((result) => {
                resolve(result.deleteLoyaltyProgram);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = LoyaltyProgramController;
