class VendorController {
    constructor(app){
        this.app = app;
        this.authenticate = this.authenticate.bind(this);
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
