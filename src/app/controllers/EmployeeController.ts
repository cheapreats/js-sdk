interface AddEmployee {
  username: string;
  password: string;
  role: string;
  email_address: string;
  phone_number: string;
  vendor_id: string;
  email_preferences: EmailPref;
}
interface UpdateEmployee {
  email_address?: string;
  password?: string;
  phone_number?: string;
  role?: string;
  email_preferences?: EmailPref;
}
enum Method {
  EMAIL = "EMAIL",
  SMS = "SMS"
}
/**
 * Controller for employees.
 */
class EmployeeController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.enrollTerminalFcm = this.enrollTerminalFcm.bind(this);
    this.revokeTerminalFcm = this.revokeTerminalFcm.bind(this);
    this.resetEmployeePassword = this.resetEmployeePassword.bind(this);
    this.sendPasswordResetCode = this.sendPasswordResetCode.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new employee, return employee ID if successful
   * @param {AddEmployee} employee - The Employee Object
   * @returns {Promise<any>} - The id of the Employee Object
   */
  create(employee: AddEmployee): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createEmployeeMutation ($employee: CreateEmployeeInput!) {
                    createEmployee(employee: $employee) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          employee
        })
        .then((result: { createEmployee: { _id: any } }) => {
          resolve(result.createEmployee._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a employee
   * @param {string} id - The id of the Employee Object
   * @param {UpdateEmployee} employee - The Employee Object
   * @returns {Promise<any>} - The id of the Employee Object
   */
  update(id: string, employee: UpdateEmployee): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateEmployeeMutation ($id: String!, $employee: UpdateEmployeeInput!) {
                    updateEmployee(id: $id, employee: $employee) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          employee
        })
        .then((result: { updateEmployee: { _id: any } }) => {
          resolve(result.updateEmployee._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a Employee instance
   * @param {string} id - The id of the Employee Object
   * @returns {Promise<any>}
   */
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteEmployee ($id: String!) {
                    deleteEmployee(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteEmployee: any }) => {
          resolve(result.deleteEmployee);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Enroll a new FCM token for terminal app
   * @param {string} id - The id of the Employee Object
   * @param {string} token - The FCM token for the Terminal Mobile App
   * @returns {Promise<any>}
   */
  enrollTerminalFcm(id: string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation enrollEmployeeTerminalFcmToken ($id: String!, $token: String!) {
                    enrollEmployeeTerminalFcmToken(id: $id, token: $token) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          token
        })
        .then((result: { enrollEmployeeTerminalFcmToken: any }) => {
          resolve(result.enrollEmployeeTerminalFcmToken);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Revoke a FCM token for terminal app
   * @param {string} token - The FCM token for the Terminal Mobile App
   * @returns {Promise<any>}
   */
  revokeTerminalFcm(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation revokeEmployeeTerminalFcmToken ($token: String!) {
                    revokeEmployeeTerminalFcmToken(token: $token)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          token
        })
        .then((result: { revokeEmployeeTerminalFcmToken: any }) => {
          resolve(result.revokeEmployeeTerminalFcmToken);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Resets an employee password
   * @param {string} id - Id of the employee
   * @param {string} email_address - Email address of the employee
   * @param {string} code - Reset code
   * @param {string} password - The new password to set
   * @returns {Promise<any>}
   */
  resetEmployeePassword(
    id: string,
    email_address: string,
    code: string,
    password: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation resetEmployeePassword ($id: String, $email_address:String, $code:String!, $password:String!) {
                    resetEmployeePassword(id: $id, email_address: $email_address, code: $code, password: $password) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          email_address,
          code,
          password
        })
        .then((result: { resetEmployeePassword: { _id: any } }) => {
          resolve(result.resetEmployeePassword._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Sends a password reset code to employee
   * @param {string} email_address - Id of the employee
   * @param {Method} method - The new password to set
   * @returns {Promise<any>}
   */
  sendPasswordResetCode(
    email_address: string,
    method: Method = Method.EMAIL
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation sendEmployeePasswordResetCode ($email_address: String!, $method:ResetCodeSendMethod) {
                    sendEmployeePasswordResetCode(email_address: $email_address, method:$method)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          email_address,
          method
        })
        .then((result: { sendEmployeePasswordResetCode: any }) => {
          resolve(result.sendEmployeePasswordResetCode);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = EmployeeController;
