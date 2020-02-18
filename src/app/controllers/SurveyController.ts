enum QuestionType {
  CHECKBOX = "CHECKBOX",
  MULTI_CHECKBOX = "MULTI_CHECKBOX",
  SHORT_ANSWER = "SHORT_ANSWER",
  RATING = "RATING"
}
enum DeliveryRule {
  AFTER_ORDER = "AFTER_ORDER"
}

interface Question {
  question: string;
  description?: string;
  question_type: QuestionType;
  choices?: Array<string>;
  max_rating?: number;
  required?: boolean;
}
interface AddSurvey {
  title: string;
  vendor_id: string;
  questions: Array<Question>;
  delivery_rule?: DeliveryRule;
  loyalty_reward?: number;
  wallet_reward?: number;
}
interface UpdateSurvey {
  title?: string;
  questions?: Array<Question>;
  delivery_rule?: DeliveryRule;
  loyalty_reward?: number;
  wallet_reward?: number;
}
interface AddSurveyResponse {
  customer_id: string;
  responses: Array<{ question_id: string; answer: Array<string> }>;
  order_id?: string;
}
class SurveyController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.archive = this.archive.bind(this);
    this.delete = this.delete.bind(this);
    this.release = this.release.bind(this);
    this.createSurveyResponse = this.createSurveyResponse.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new Survey and return the ID of the created object if successful
   * @param {AddSurvey} survey - The Survey Object
   * @returns {Promise<any>}
   */
  create(survey: AddSurvey): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($survey: CreateSurveyInput!) {
                    createSurvey(survey: $survey) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          survey
        })
        .then((result: { createSurvey: { _id: any } }) => {
          resolve(result.createSurvey._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a Survey and return the ID of the updated object if successful
   * @param {string} id - The id of the survey to be modified
   * @param {UpdateSurvey} survey - The Modified Survey Object
   * @returns {Promise<any>}
   */
  update(id: string, survey: UpdateSurvey): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $survey: UpdateSurveyInput!) {
                    updateSurvey(id: $id, survey: $survey) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          survey
        })
        .then((result: { updateSurvey: { _id: any } }) => {
          resolve(result.updateSurvey._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Archive a Survey
   * @param {string} id - The id of the Survey Object
   * @returns {Promise<String>} - Confirmation String
   */
  archive(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    archiveSurvey(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { archiveSurvey: string | PromiseLike<string> }) => {
          resolve(result.archiveSurvey);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a Survey
   * @param {string} id - The id of the Survey Object
   * @returns {Promise<String>} - Confirmation String
   */
  delete(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteSurvey(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteSurvey: string | PromiseLike<string> }) => {
          resolve(result.deleteSurvey);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Release a Survey
   * @param {string} id - The id of the Survey Object
   * @returns {Promise<any>} - The id of the Survey object
   */
  release(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    releaseSurvey(id: $id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { releaseSurvey: { _id: any } }) => {
          resolve(result.releaseSurvey._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Create a SurveyResponse object for a Survey object and returns the SurveyResponse ID if successful
   * @param {string} survey_id - The Survey Object ID
   * @param {AddSurveyResponse} survey_response - The survey response object; the CreateSurveyResponseInput object
   * @returns {Promise<any>}
   */
  createSurveyResponse(
    survey_id: string,
    survey_response: AddSurveyResponse
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($survey_id: String!, $survey_response: CreateSurveyResponseInput!) {
                    createSurveyResponse(survey_id: $survey_id, survey_response: $survey_response) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          survey_id,
          survey_response
        })
        .then((result: { createSurveyResponse: { _id: any } }) => {
          resolve(result.createSurveyResponse._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = SurveyController;
