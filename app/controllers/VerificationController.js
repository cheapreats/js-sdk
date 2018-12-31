const HttpLink = require('../links/synchronouslinks/HttpLink');

class VerificationController {
    constructor(app){
        this.app = app;
        this.sendSms = this.sendSms.bind(this);
        this.checkSms = this.checkSms.bind(this);
    }
    /**
     * @param {string} append=""
     */
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

    /**
     * Checks SMS verification code
     * @param request_id
     * @param code
     * @param number
     * @returns {Promise<any>}
     */
    checkSms(request_id, code, number){
        return new Promise((resolve, reject) => {
           let link = this.getHttpLink("/sms/check");
           link.post({
               data: { request_id, code, number }
           })
               .then((data) => {
                if(data.data.status === "ok"){
                    resolve(data.data.status);
                } else {
                    reject();
                }
               })
               .catch(e => {
                   reject(e);
               })
        });
    }
}

module.exports = VerificationController;
