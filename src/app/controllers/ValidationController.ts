import HttpLink from "../links/synchronouslinks/HttpLink";
//PR ts says its already decalred somewhere else
/**
 * Controller for validation services.
 */
class ValidationController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.customerSignupEmail = this.customerSignupEmail.bind(this);
    this.customerSignupPhone = this.customerSignupPhone.bind(this);
  }

  getHttpLink(append = "") {
    return new HttpLink(
      this.app.getConfiguration().endpoints.validationEndpoint.production +
        append
    );
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Check if an email can be used for customer account creation
   * @param {string} email - An email
   * @returns {Promise<any>}
   */
  customerSignupEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let link = this.getHttpLink("/customer/signup/email");
      link
        .post({
          data: { email }
        })
        .then(data => {
          resolve(data.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  /**
   * Check if a phone number can be used for customer account creation
   * @param {string} phone - The phone number to send the code to (Without Country Code & no spaces/special characters)
   * @returns {Promise<any>}
   */
  customerSignupPhone(phone: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let link = this.getHttpLink("/customer/signup/phone");
      link
        .post({
          data: { phone }
        })
        .then(data => {
          resolve(data.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

module.exports = ValidationController;
