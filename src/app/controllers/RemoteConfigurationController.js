/**
 * Controller for remote configuration.
 */
class RemoteConfigurationController {
    constructor(app) {
        this.app                    = app;
        // ADD BINDINGS BELOW
        this.deleteRawConfiguration = this.deleteRawConfiguration.bind(this);
        this.updateRawConfiguration = this.updateRawConfiguration.bind(this);
        this.createRawConfiguration = this.createRawConfiguration.bind(this);
    }

    // ADD MUTATION METHODS BELOW

    deleteRawConfiguration(id) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!) {
                    deleteRawConfiguration(id: $id)
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id
            }).then((result) => {
                resolve(result.deleteRawConfiguration);
            }).catch(e => {
                reject(e);
            });
        });
    }

    updateRawConfiguration(id, rawConfiguration) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($id: String!, $rawConfiguration: UpdateRawConfigurationInput!) {
                    updateRawConfiguration(id: $id, raw_configuration: $rawConfiguration) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, rawConfiguration
            }).then((result) => {
                resolve(result.updateRawConfiguration);
            }).catch(e => {
                reject(e);
            });
        });
    }

    createRawConfiguration(rawConfiguration) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation ($rawConfiguration: CreateRawConfigurationInput!) {
                    createRawConfiguration(raw_configuration: $rawConfiguration) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                rawConfiguration
            }).then((result) => {
                resolve(result.createRawConfiguration);
            }).catch(e => {
                reject(e);
            });
        });
    }


}

module.exports = RemoteConfigurationController;
