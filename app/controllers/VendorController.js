class VendorController {
    constructor(app){
        this.app = app;
        this.authenticate = this.authenticate.bind(this);
        this.create = this.create.bind(this);
    }


    /**
     * Create a new vendor, return vendor ID if successful
     * @param name
     * @param emailAddress
     * @param phoneNumber
     * @param location
     * @param openHours
     * @param lastCallHours
     * @param password
     * @param businessPhoneNumber
     * @param firstName
     * @param lastName
     * @returns {Promise<any>}
     */
    create(name, emailAddress, phoneNumber, location, openHours, lastCallHours, password, businessPhoneNumber, firstName, lastName){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation addCustomerMutation ($name: String!, $emailAddress: String!, $phoneNumber: String!, $location: String!, $openHours: String!, $lastCallHours: String!, $password: String!, $businessPhoneNumber: String!, $firstName: String!, $lastName: String!) {
                    addVendor(name: $name, emailAddress: $emailAddress, phoneNumber: $phoneNumber, location: $location, openHours: $openHours, lastCallHours: $lastCallHours, password: $password, businessPhoneNumber: $businessPhoneNumber, firstName: $firstName, lastName: $lastName) {
                        id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                name, emailAddress, phoneNumber, location, openHours, lastCallHours, password, businessPhoneNumber, firstName, lastName
            }).then(result => {
                resolve(result.addVendor.id);
            }).catch(e => {
                reject(e);
            });
        });
    }


    /**
     * Authenticate a vendor, return token upon resolve.
     * If you only pass the first parameter, then this endpoint will treat that as auth token, and resolve vendor id if token
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
                    mutation addVendorTokenMutation ($emailAddress: String!, $password: String!) {
                        addVendorToken(emailAddress: $emailAddress, password: $password){
                            tokenBody
                        }
                    }
                `;
                let self = this;
                this.app.getAdaptor().mutate(mutationString, {
                    emailAddress, password
                }).then(result => {
                    self.app.setAuthenticationToken(result.addVendorToken.tokenBody);
                    resolve(result.addVendorToken.tokenBody);
                }).catch(e => {
                    reject(e);
                });
            // 2. Authenticate with token
            } else if (emailAddress) {
                this.app.setAuthenticationToken(emailAddress);
                this.app.getAdaptor().query('query { theVendor { id } }').then(result => {
                    resolve(result.theVendor.id);
                }).catch(e => {
                    reject(e);
                })
            // 3. Check authentication status
            } else {
                this.app.getAdaptor().query('query { theVendor { id } }').then(result => {
                    resolve(result.theVendor.id);
                }).catch(e => {
                    reject(e);
                })
            }
        });
    }


}

module.exports = VendorController;
