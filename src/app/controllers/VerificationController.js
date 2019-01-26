/**
 * Controller for verification.
 */
class VerificationController {
    constructor(app){
        this.app = app;
        this.startVerificationSession = this.startVerificationSession.bind(this);
        this.checkVerificationSession = this.checkVerificationSession.bind(this);
    }

    /**
     * Start a new SMS verification Session
     * @param {string} phone_number - The phone to be verified
     * @returns {Promise<any>} - The uuid required to verify the verification code
     */
    startVerificationSession(phone_number){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createSmsVerificationSessionMutation ($phone_number:String!) {
                    createSmsVerificationSession(phone_number:$phone_number) {
                        uuid
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                phone_number
            }).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            });
        });
    }


    /**
     * Verify an Phone number via code received
     * @param {string} uuid - UUID of the verification request
     * @param {string} verification_code - Verification code received on the device
     * @returns {Promise<any>} - verification status along with the number corresponding to the UUID
     */
    checkVerificationSession(uuid, verification_code){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation verifySmsVerificationSessionMutation ($uuid:String!, $verification_code:String!) {
                    verifySmsVerificationSession(uuid:$uuid, verification_code:$verification_code) {
                        phone_number,
                        verified_status
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                uuid, verification_code
            }).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            });
        });
    }
}

module.exports = VerificationController;
