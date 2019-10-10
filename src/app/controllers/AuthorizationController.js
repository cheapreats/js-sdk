class AuthorizationController {
    constructor(app) {
        this.app           = app;
        this.getTokenScope = this.getTokenScope.bind(this);
    }

    /**
     * Get the authorization scope (role) for a user in the system through the issued token
     * @param {string} token - Authorization Token Issued
     * @returns {Promise<any>} - Role of the user in the system
     */
    getTokenScope(token) {
        let queryString = `
            query {
                auth_token_scope(token: "${token}")
            }
        `;
        return new Promise((resolve, reject) => {
            return this.app.getAdaptor().query(queryString).then(data => {
                resolve(data.auth_token_scope);
            }).catch(e => {
                reject(e);
            });
        });

    }

}

module.exports = AuthorizationController;
