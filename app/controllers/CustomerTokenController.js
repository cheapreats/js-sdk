const CustomerToken = require('../models/user/Customer');

class CustomerTokenController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
    }

    /**
     * Create a new CustomerToken, return CustomerToken ID if successful
     * @param email_address
     * @param password
     * @returns {Promise<any>}
     */
    create(email_address, password){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createCustomerTokenMutation ($email_address: String!, $password: String!) {
                    createCustomerToken(email_address: $email_address, password: $password) {
                        _id
                        body
                        created_at
                        updated_at
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                email_address,
                password
            }).then(result => {
                resolve(result.createCustomerToken);
            }).catch(e => {
                reject(e);
            });
        });
    }


}

module.exports = CustomerTokenController;
