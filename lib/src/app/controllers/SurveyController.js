"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SurveyController = function () {
    function SurveyController(app) {
        _classCallCheck(this, SurveyController);

        this.app = app;
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.release = this.release.bind(this);
        this.createSurveyResponse = this.createSurveyResponse.bind(this);
    }

    /**
     * Create a new Survey and return the ID of the created object if successful
     * @param {Object} survey - The Survey Object
     * @returns {Promise<any>} 
     */


    _createClass(SurveyController, [{
        key: "create",
        value: function create(survey) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($survey: CreateSurveyInput!) {\n                    createSurvey(survey: $survey) {\n                        _id\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    survey: survey
                }).then(function (result) {
                    resolve(result.createSurvey._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Update a Survey and return the ID of the updated object if successful
         * @param {string} id - The id of the survey to be modified
         * @param {Object} survey - The Modified Survey Object
         * @returns {Promise<any>}
         */

    }, {
        key: "update",
        value: function update(id, survey) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!, $survey: UpdateSurveyInput!) {\n                    updateSurvey(id: $id, survey: $survey) {\n                        _id\n                    }\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id, survey: survey
                }).then(function (result) {
                    resolve(result.updateSurvey._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Delete a Survey
         * @param {string} id - The id of the Survey Object
         * @returns {Promise<any>} - The id of the Survey object
         */

    }, {
        key: "delete",
        value: function _delete(id) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!) {\n                    deleteSurvey(id: $id)\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function () {
                    resolve();
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Release a Survey
         * @param {string} id - The id of the Survey Object
         * @returns {Promise<any>} - The id of the Survey object
         */

    }, {
        key: "release",
        value: function release(id) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!) {\n                    releaseSurvey(id: $id) {\n                        _id\n                    }\n                }\n            ";
                _this4.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.releaseSurvey._id);
                }).catch(function (e) {
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

    }, {
        key: "createSurveyResponse",
        value: function createSurveyResponse(survey_id, survey_response) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($survey_id: String!, $survey_response: CreateSurveyResponseInput!) {\n                    createSurveyResponse(survey_id: $survey_id, survey_response: $survey_response) {\n                        _id\n                    }\n                }\n            ";
                _this5.app.getAdaptor().mutate(mutationString, {
                    survey_id: survey_id, survey_response: survey_response
                }).then(function (result) {
                    resolve(result.createSurveyResponse._id);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return SurveyController;
}();

module.exports = SurveyController;