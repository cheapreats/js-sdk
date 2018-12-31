class EmployeeController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.enrollTerminalFcm = this.enrollTerminalFcm.bind(this);
        this.revokeTerminalFcm = this.revokeTerminalFcm.bind(this);
    }


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

}

module.exports = EmployeeController;
