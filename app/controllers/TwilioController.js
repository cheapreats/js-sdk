/**
 * Controller for all Twilio related endpoints
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const HttpLink = require('../links/synchronouslinks/HttpLink');

class TwilioController {
    constructor(app){
        this.app = app;
        this.getCode = this.getCode.bind(this);
        this.canVerify = this.canVerify.bind(this);
    }

    /**
     * Get HttpLink appended with append
     * @param append
     * @returns {HttpLink}
     */
    getHttpLink(append = ""){
        if(this.app.getAdaptorMode() === 'production'){
            return new HttpLink(this.app.getConfiguration().endpoints.restEndpoint.production + append);
        } else {
            return new HttpLink(this.app.getConfiguration().endpoints.restEndpoint.qa + append);
        }
    }

    /**
     * Get verification code sent to a phone
     * @param phoneNumber
     * @param countryCode
     * @returns {Promise<any>}
     */
    getCode(phoneNumber, countryCode){
        const link = this.getHttpLink("/get_code");
        return new Promise((resolve, reject) => {
            link.post({
                data: {
                    phone_number: phoneNumber,
                    country_code: countryCode
                }
            }).then(() => {
                resolve(true);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Check if a phone number can be used to verify
     * @param phoneNumber
     * @returns {Promise<any>}
     */
    canVerify(phoneNumber){
        const link = this.getHttpLink("/can_verify");
        return new Promise((resolve, reject) => {
            link.post({
                data: {
                    phone_number: phoneNumber
                }
            }).then(data => {
                if(data.data === "yes"){
                    resolve(true);
                } else {
                    return Promise.reject();
                }
            }).catch(e => {
                reject(e);
            });
        });
    }
}

module.exports = TwilioController;
