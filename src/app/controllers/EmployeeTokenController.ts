/**
 * Controller for employee tokens.
 */
class EmployeeTokenController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new EmployeeToken, return EmployeeToken ID if successful
   * @param {string} vendor_id - The id of the Vendor this employee will be assigned to
   * @param {string} username - The Username of the Employee
   * @param {string} password - The password of the Employee
   * @returns {Promise<any>}
   */
  create(vendor_id: string, username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createEmployeeTokenMutation ($vendor_id: String!, $username: String!, $password: String!) {
                    createEmployeeToken(vendor_id: $vendor_id, username: $username, password: $password) {
                        body
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          username,
          password
        })
        .then((result: { createEmployeeToken: { body: any } }) => {
          resolve(result.createEmployeeToken.body);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = EmployeeTokenController;
