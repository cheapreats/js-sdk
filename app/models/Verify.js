const HttpLink = require('../links/synchronouslinks/HttpLink');


// This is special, not really a model
class Verify {
    constructor(config){
        this._getVerificationCodeLink = new HttpLink(config.getVerificationCodeEndpoint);
        this._twilioController = require('../controllers/TwilioController');
    }

    /**
     * Get a new verification code
     * @param phoneNumber
     * @param countryCode
     * @returns {*}
     */
    getCode(phoneNumber, countryCode){
        return this._twilioController.getVerificationCode(this._getVerificationCodeLink, phoneNumber, countryCode);
    }
}

module.exports = Verify;
