class CustomerController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
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


}

module.exports = CustomerController;
