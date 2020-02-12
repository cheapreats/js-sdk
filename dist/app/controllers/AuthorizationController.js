"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthorizationController = function () {
    function AuthorizationController(app) {
        _classCallCheck(this, AuthorizationController);

        this.app = app;
        this.getTokenScope = this.getTokenScope.bind(this);
    }

    _createClass(AuthorizationController, [{
        key: "getTokenScope",
        value: function getTokenScope(token) {
            var _this = this;

            var queryString = "\n            query {\n                auth_token_scope(token: \"" + token + "\")\n            }\n        ";
            return new Promise(function (resolve, reject) {
                return _this.app.getAdaptor().query(queryString).then(function (data) {
                    resolve(data.auth_token_scope);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return AuthorizationController;
}();

module.exports = AuthorizationController;