const HttpLink = require("../links/synchronouslinks/HttpLink");
//PR same issue where ts is saying HttpLink has already been declared elsewhere
// This is special, not really a model
class Verify {
  _getVerificationCodeLink: any;
  _twilioController: any;
  constructor(config: { getVerificationCodeEndpoint: any }) {
    this._getVerificationCodeLink = new HttpLink(
      config.getVerificationCodeEndpoint
    );
    this._twilioController = require("../controllers/TwilioController");
  }

  /**
   * Get a new verification code
   * @param {string} phoneNumber
   * @param {string} countryCode
   * @returns {*}
   */

  getCode(phoneNumber: string, countryCode: string): any {
    return this._twilioController.getVerificationCode(
      this._getVerificationCodeLink,
      phoneNumber,
      countryCode
    );
  }
}

module.exports = Verify;
