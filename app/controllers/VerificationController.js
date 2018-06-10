const HttpLink = require('../links/synchronouslinks/HttpLink');

class VerificationController {
    constructor(app){
        this.app = app;
        this.sendSms = this.sendSms.bind(this);
    }

    getHttpLink(append = ""){
        return new HttpLink(this.app.getConfiguration().endpoints.verificationEndpoint.production + append);
    }

    /**
     * Send a verification SMS to number
     * @param number
     * @returns {Promise<any>}
     */
    sendSms(number){
        return new Promise((resolve, reject) => {
           let link = this.getHttpLink("/sms/send");
           link.post({
               data: { number }
           })
               .then((data) => {
                   resolve(data.data.request_id);
               })
               .catch(e => {
                   reject(e);
               })
        });
    }
}

module.exports = VerificationController;
