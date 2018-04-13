/**
 * Controller for all Twilio related endpoints
 * Author: Jun Zheng
 * License: UNLICENSED
 */

class TwilioController {
    static getVerificationCode(link, phoneNumber, countryCode) {
        return new Promise((resolve, reject) => {
            link.post({
                data: {
                    phone_number: phoneNumber,
                    country_code: countryCode
                }
            }).then(data => {
                resolve(true);
            }).catch(e => {
                reject(e);
            });
        });
    }
}

module.exports = TwilioController;
