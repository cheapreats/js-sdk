class EmployeeTokenController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
    }


    /**
     * Create a new EmployeeToken, return EmployeeToken ID if successful
     * @param vendor_id
     * @param username
     * @param password
     * @returns {Promise<any>}
     */
    create(vendor_id, username, password){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createEmployeeTokenMutation ($vendor_id: String!, $username: String!, $password: String!) {
                    createEmployeeToken(vendor_id: $vendor, username: $username, password: $password) {
                        body
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                vendor_id,
                username,
                password
            }).then(result => {
                resolve(result.createEmployeeTokenMutation._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = EmployeeTokenController;
