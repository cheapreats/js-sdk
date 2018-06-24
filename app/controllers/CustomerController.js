class CustomerController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.updateCreditCard = this.updateCreditCard.bind(this);
        this.enrollApnsToken = this.enrollApnsToken.bind(this);
    }

    /**
     * Create a new customer, return customer ID if successful
     * @param customer
     * @returns {Promise<any>}
     */
    create(customer){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createCustomerMutation ($customer: CreateCustomerInput!) {
                    createCustomer(customer: $customer) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                customer
            }).then(result => {
                resolve(result.createCustomer._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update a customer
     * @param id
     * @param customer
     * @returns {Promise<any>}
     */
    update(id, customer){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateCustomerMutation ($id: String!, $customer: UpdateCustomerInput!) {
                    updateCustomer(id: $id, customer: $customer) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, customer
            }).then(result => {
                resolve(result.updateCustomer);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Enroll a new APNs token
     * @param id
     * @param token
     * @returns {Promise<any>}
     */
    enrollApnsToken(id, token){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation enrollCustomerApnsTokenMutation ($id: String!, $token: String!) {
                    enrollCustomerApnsToken(id: $id, token: $token) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, token
            }).then(result => {
                resolve(result.enrollCustomerApnsToken);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update a customer's credit card
     * @param id
     * @param token
     * @returns {Promise<any>}
     */
    updateCreditCard(id, token){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateCustomerCreditCardMutation ($id: String!, $token: String!) {
                    updateCustomerCreditCard(id: $id, token: $token) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, token
            }).then(result => {
                resolve(result.updateCustomerCreditCard);
            }).catch(e => {
                reject(e);
            });
        });
    }


}

module.exports = CustomerController;
