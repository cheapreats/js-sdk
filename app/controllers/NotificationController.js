const HttpLink = require('../links/synchronouslinks/HttpLink');


class NotificationController {
    constructor(app){
        this.app = app;
        this.apnsEnrollCustomer = this.apnsEnrollCustomer.bind(this);
        this.apnsRevokeCustomer = this.apnsRevokeCustomer.bind(this);
    }

    /**
     * Get HttpLink appended with append
     * @param {string} append=""
     * @returns {HttpLink}
     */
    getHttpLink(append = ""){
        if(this.app.getAdaptorMode() === 'production'){
            return new HttpLink(this.app.getConfiguration().endpoints.notificationEndpoint.production + append);
        } else {
            return new HttpLink(this.app.getConfiguration().endpoints.notificationEndpoint.qa + append);
        }
    }

    /**
     * Enroll a customer iOS device, authentication required
     * @param apnsToken
     * @returns {Promise<any>}
     */
    apnsEnrollCustomer(apnsToken){
        const link = this.getHttpLink("/api/APNSEnrollCustomer");
        return new Promise((resolve, reject) => {
            link
                .post({
                    data: JSON.stringify({
                        apnsToken,
                        authenticationToken: this.app.getAuthenticationToken()
                    }),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(() => {
                    resolve();
                })
                .catch(e => {
                    reject(e);
                })
        });
    }

    /**
     * Revoke an iOS device
     * @param apnsToken
     * @returns {Promise<any>}
     */
    apnsRevokeCustomer(apnsToken){
        const link = this.getHttpLink("/api/APNSRevokeCustomer");
        return new Promise((resolve, reject) => {
            link
                .post({
                    data: JSON.stringify({
                        apnsToken
                    }),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(() => {
                    resolve();
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

}

module.exports = NotificationController;
