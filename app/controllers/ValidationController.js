const HttpLink = require('../links/synchronouslinks/HttpLink');

class ValidationController {
    constructor(app){
        this.app = app;
        this.customerSignupEmail = this.customerSignupEmail.bind(this);
        this.customerSignupPhone = this.customerSignupPhone.bind(this);
    }

    getHttpLink(append = ""){
        return new HttpLink(this.app.getConfiguration().endpoints.validationEndpoint.production + append);
    }

    /**
     * Check if an email can be used for customer account creation
     * @param email
     * @returns {Promise<any>}
     */
    customerSignupEmail(email){
        return new Promise((resolve, reject) => {
            let link = this.getHttpLink("/customer/signup/email");
            link.post({
                data: { email }
            })
                .then((data) => {
                    resolve(data.data);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }

    /**
     * Check if a phone number can be used for customer account creation
     * @param phone
     * @returns {Promise<any>}
     */
    customerSignupPhone(phone){
        return new Promise((resolve, reject) => {
            let link = this.getHttpLink("/customer/signup/phone");
            link.post({
                data: { phone }
            })
                .then((data) => {
                    resolve(data.data);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }
}

module.exports = ValidationController;
