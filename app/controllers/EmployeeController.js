class EmployeeController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }


    /**
     * Create a new employee, return employee ID if successful
     * @param employee
     * @returns {Promise<any>}
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
     * @param id
     * @param employee
     * @returns {Promise<any>}
     */
    update(id, employee){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateEmployeeMutation ($id: String!, $employee: CreateEmployeeInput!) {
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
     * @param id
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

}

module.exports = EmployeeController;
