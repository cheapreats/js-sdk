class SurveyController {
    constructor(app){
        this.app = app;
        this.create.bind(this);
        this.delete.bind(this);
        this.createSurveyResponse.bind(this);
    }

    /**
     * Create a new Survey and return the ID of the created object if successful
     * @param {string} vendor_id - The vendor id for which the survey is to be created for
     * @param {Object} survey - The Survey Object
     * @returns {Promise<any>} 
     */
    create(vendor_id, survey){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createSurveyMutation ($vendor_id: String!, $survey: CreateSurveyInput!) {
                    createSurvey(vendor_id: $vendor_id, survey: $survey) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                vendor_id, survey
            }).then(result => {
                resolve(result.createSurvey._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Delete a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<any>} - The id of the Survey object
     */
    delete(id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation deleteSurveyMutation ($id: String!) {
                    deleteSurvey(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then(() => {
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Create a SurveyResponse object for a Survey object and returns the SurveyResponse ID if successful
     * @param {string} survey_id - The Survey Object ID
     * @param {Object} survey_response - The survey response object; the CreateSurveyResponseInput object
     * @returns {Promise<any>}
     */
    createSurveyResponse(survey_id, survey_response) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createSurveyResponse ($survey_id: String!, $survey_response: CreateSurveyResponseInput!) {
                    createSurveyResponse(survey_id: $survey_id, survey_response: $survey_response) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                survey_id, survey_response
            }).then(result => {
                resolve(result.createSurveyResponse._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = SurveyController;