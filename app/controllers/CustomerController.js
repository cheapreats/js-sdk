
const Customer = require('../models/user/Customer');

class CustomerController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.addCreditCard = this.addCreditCard.bind(this);
        this.updateCreditCard = this.updateCreditCard.bind(this);
    }

    /**
     * Create a new customer, return created customer ID upon resolve
     * @param firstName
     * @param lastName
     * @param emailAddress
     * @param password
     * @param phoneNumber
     * @param code
     * @returns {Promise<any>}
     */
    create(firstName, lastName, emailAddress, password, phoneNumber, code){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation addCustomerMutation ($firstName: String!, $lastName: String!, $emailAddress: String!, $password: String!, $phoneNumber: String!, $code: String!) {
                    addCustomer(firstName: $firstName, lastName: $lastName, emailAddress: $emailAddress, password: $password, phoneNumber: $phoneNumber, code: $code) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                firstName, lastName, emailAddress, password, phoneNumber, code
            }).then(result => {
                resolve(result.addCustomer.id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Authenticate a customer, return token upon resolve.
     * If you only pass the first parameter, then this endpoint will treat that as auth token, and resolve customer id if token
     * is valid.
     * @param emailAddress
     * @param password
     * @returns {Promise<any>}
     */
    authenticate(emailAddress = null, password = null){
        return new Promise((resolve, reject) => {
            // 1. Authenticate with email & password
            if(password){
                let mutationString = `
                    mutation addCustomerTokenMutation ($emailAddress: String!, $password: String!) {
                        addCustomerToken(emailAddress: $emailAddress, password: $password){
                            tokenBody
                        }
                    }
                `;
                let self = this;
                this.app.getAdaptor().mutate(mutationString, {
                    emailAddress, password
                }).then(result => {
                    self.app.setAuthenticationToken(result.addCustomerToken.tokenBody);
                    resolve(result.addCustomerToken.tokenBody);
                }).catch(e => {
                    reject(e);
                });
            // 2. Authenticate with token
            } else if (emailAddress) {
                this.app.setAuthenticationToken(emailAddress);
                this.app.getAdaptor().query('query { theCustomer { id } }').then(result => {
                    resolve(result.theCustomer.id);
                }).catch(e => {
                    reject(e);
                })
            // 3. Check authentication status
            } else {
                this.app.getAdaptor().query('query { theCustomer { id } }').then(result => {
                    resolve(result.theCustomer.id);
                }).catch(e => {
                    reject(e);
                })
            }
        });
    }

    /**
     * Add a new credit card to customer account
     * @param lastFour
     * @param type
     * @param stripeToken
     * @returns {Promise<any>}
     */
    addCreditCard(lastFour, type, stripeToken){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation addCreditCard ($lastFour: String!, $type: String!, $stripeToken: String!) {
                    addCreditCard(lastFour: $lastFour, type: $type, stripeToken: $stripeToken) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                lastFour, type, stripeToken
            }).then(result => {
                resolve(result.addCreditCard.id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update customer's default payment credit card
     * @param stripeToken
     * @returns {Promise<any>}
     */
    updateCreditCard(stripeToken){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateCreditCard ($stripeToken: String!) {
                    updateCreditCard(stripeToken: $stripeToken)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                stripeToken
            }).then(result => {
                resolve(result.updateCreditCard);
            }).catch(e => {
                reject(e);
            });
        });
    }


}

module.exports = CustomerController;
