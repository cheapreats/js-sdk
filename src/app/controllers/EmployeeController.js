/**
 * Controller for employees.
 */
class EmployeeController {
    constructor(app){
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
     * @param {Object} employee - The Employee Object
     * @returns {Promise<any>} - The id of the Employee Object
     */
    create(employee){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createEmployeeMutation ($employee: CreateEmployeeInput!) {
                    createEmployee(employee: $employee) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                employee
            }).then(result => {
                resolve(result.createEmployee._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update a employee
     * @param {string} id - The id of the Employee Object
     * @param {Object} employee - The Employee Object
     * @returns {Promise<any>} - The id of the Employee Object
     */
    update(id, employee){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateEmployeeMutation ($id: String!, $employee: UpdateEmployeeInput!) {
                    updateEmployee(id: $id, employee: $employee) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id,
                employee
            }).then(result => {
                resolve(result.updateEmployee._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a Employee instance
     * @param {string} id - The id of the Employee Object
     * @returns {Promise<any>}
     */
    delete(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation deleteEmployee ($id: String!) {
                    deleteEmployee(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then(result => {
                resolve(result.deleteEmployee);
            }).catch(e => {
                reject(e);
            });
        })
    }

    /**
     * Enroll a new FCM token for terminal app
     * @param {string} id - The id of the Employee Object
     * @param {string} token - The FCM token for the Terminal Mobile App
     * @returns {Promise<any>}
     */
    enrollTerminalFcm(id, token) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation enrollEmployeeTerminalFcmToken ($id: String!, $token: String!) {
                    enrollEmployeeTerminalFcmToken(id: $id, token: $token) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, token
            }).then(result => {
                resolve(result.enrollEmployeeTerminalFcmToken);
            }).catch(e => {
                reject(e);
            });
        })
    }

    /**
     * Revoke a FCM token for terminal app
     * @param {string} token - The FCM token for the Terminal Mobile App
     * @returns {Promise<any>}
     */
    revokeTerminalFcm(token) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation revokeEmployeeTerminalFcmToken ($token: String!) {
                    revokeEmployeeTerminalFcmToken(token: $token)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                token
            }).then(result => {
                resolve(result.revokeEmployeeTerminalFcmToken);
            }).catch(e => {
                reject(e);
            });
        })
    }

    /**
     * Resets an employee password
     * @param {string} id - Id of the employee
     * @param {string} email_address - Email address of the employee
     * @param {string} code - Reset code
     * @param {string} password - The new password to set
     * @returns {Promise<any>}
     */
    resetEmployeePassword(id, email_address, code, password) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation resetEmployeePassword ($id: String, $email_address:String, $code:String!, $password:String!) {
                    resetEmployeePassword(id: $id, email_address: $email_address, code: $code, password: $password) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, email_address, code, password
            }).then(result => {
                resolve(result.resetEmployeePassword._id);
            }).catch(e => {
                reject(e);
            });
        })
    }

    /**
     * Sends a password reset code to employee
     * @param {string} email_address - Id of the employee
     * @param {string} method - The new password to set
     * @returns {Promise<any>}
     */
    sendPasswordResetCode(email_address, method = 'EMAIL') {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation sendEmployeePasswordResetCode ($email_address: String!, $method:ResetCodeSendMethod) {
                    sendEmployeePasswordResetCode(email_address: $email_address, method:$method)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                email_address, method
            }).then(result => {
                resolve(result.sendEmployeePasswordResetCode);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = EmployeeController;
