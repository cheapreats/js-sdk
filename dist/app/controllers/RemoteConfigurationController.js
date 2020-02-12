"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for remote configuration.
 */
var RemoteConfigurationController = function () {
    function RemoteConfigurationController(app) {
        _classCallCheck(this, RemoteConfigurationController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.fetch = this.fetch.bind(this);
        this.deleteRawConfiguration = this.deleteRawConfiguration.bind(this);
        this.updateRawConfiguration = this.updateRawConfiguration.bind(this);
        this.createRawConfiguration = this.createRawConfiguration.bind(this);
    }
    // ADD MUTATION METHODS BELOW


    _createClass(RemoteConfigurationController, [{
        key: "fetch",
        value: function fetch(name, version) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                query ($name: String!, $version: String!) {\n                    merged_configuration(name: $name, version: $version) {\n                        name\n                        data\n                    }\n                }\n            ";
                _this.app.getAdaptor().mutate(mutationString, {
                    name: name, version: version
                }).then(function (result) {
                    resolve(JSON.parse(result.merged_configuration.data));
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }, {
        key: "deleteRawConfiguration",
        value: function deleteRawConfiguration(id) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!) {\n                    deleteRawConfiguration(id: $id)\n                }\n            ";
                _this2.app.getAdaptor().mutate(mutationString, {
                    id: id
                }).then(function (result) {
                    resolve(result.deleteRawConfiguration);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }, {
        key: "updateRawConfiguration",
        value: function updateRawConfiguration(id, rawConfiguration) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($id: String!, $rawConfiguration: UpdateRawConfigurationInput!) {\n                    updateRawConfiguration(id: $id, raw_configuration: $rawConfiguration) {\n                        _id\n                    }\n                }\n            ";
                _this3.app.getAdaptor().mutate(mutationString, {
                    id: id, rawConfiguration: rawConfiguration
                }).then(function (result) {
                    resolve(result.updateRawConfiguration);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }, {
        key: "createRawConfiguration",
        value: function createRawConfiguration(rawConfiguration) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var mutationString = "\n                mutation ($rawConfiguration: CreateRawConfigurationInput!) {\n                    createRawConfiguration(raw_configuration: $rawConfiguration) {\n                        _id\n                    }\n                }\n            ";
                _this4.app.getAdaptor().mutate(mutationString, {
                    rawConfiguration: rawConfiguration
                }).then(function (result) {
                    resolve(result.createRawConfiguration);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return RemoteConfigurationController;
}();

module.exports = RemoteConfigurationController;