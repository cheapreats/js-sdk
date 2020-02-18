interface UpdateRaw {
  name?: string;
  version_mask?: string;
  data?: string;
}
interface AddRaw {
  name: string;
  version_mask: string;
  data: string;
}
/**
 * Controller for remote configuration.
 */
class RemoteConfigurationController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.fetch = this.fetch.bind(this);
    this.deleteRawConfiguration = this.deleteRawConfiguration.bind(this);
    this.updateRawConfiguration = this.updateRawConfiguration.bind(this);
    this.createRawConfiguration = this.createRawConfiguration.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  fetch(name: string, version: string) {
    return new Promise((resolve, reject) => {
      let mutationString = `
                query ($name: String!, $version: String!) {
                    merged_configuration(name: $name, version: $version) {
                        name
                        data
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          name,
          version
        })
        .then((result: { merged_configuration: { data: string } }) => {
          resolve(JSON.parse(result.merged_configuration.data));
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  deleteRawConfiguration(id: string) {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteRawConfiguration(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteRawConfiguration: any }) => {
          resolve(result.deleteRawConfiguration);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  updateRawConfiguration(id: string, rawConfiguration: UpdateRaw) {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $rawConfiguration: UpdateRawConfigurationInput!) {
                    updateRawConfiguration(id: $id, raw_configuration: $rawConfiguration) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          rawConfiguration
        })
        .then((result: { updateRawConfiguration: any }) => {
          resolve(result.updateRawConfiguration);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  createRawConfiguration(rawConfiguration: AddRaw) {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($rawConfiguration: CreateRawConfigurationInput!) {
                    createRawConfiguration(raw_configuration: $rawConfiguration) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          rawConfiguration
        })
        .then((result: { createRawConfiguration: any }) => {
          resolve(result.createRawConfiguration);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}

module.exports = RemoteConfigurationController;
