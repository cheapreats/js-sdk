"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpLink = require('../links/synchronouslinks/HttpLink');
/**
 * Controller for image services.
 */

var ImageController = function () {
    function ImageController(app) {
        _classCallCheck(this, ImageController);

        this.app = app;
        // ADD BINDINGS BELOW
        this.upload = this.upload.bind(this);
        this.getLink = this.getLink.bind(this);
    }
    /**
     * Get HttpLink appended with append
     * @param  {string} append=""
     * @returns {HttpLink}
     */


    _createClass(ImageController, [{
        key: "getHttpLink",
        value: function getHttpLink() {
            var append = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            return new HttpLink(this.app.getConfiguration().endpoints.imageEndpoint.production + append);
        }
        // ADD MUTATION METHODS BELOW
        /**
         * Upload an new image
         * @param image - Image in base64 format
         * @returns {Promise<any>}
         */

    }, {
        key: "upload",
        value: function upload(image) {
            var link = this.getHttpLink("/upload");
            return new Promise(function (resolve, reject) {
                link.post({
                    data: {
                        image: image
                    }
                }).then(function (result) {
                    resolve(result.data);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
        /**
         * Get an image link with size
         * @param {string} id
         * @param {string} size (100px, 300px, 600px or 1200px)
         * @returns {string}
         */

    }, {
        key: "getLink",
        value: function getLink(id, size) {
            return this.app.getConfiguration().endpoints.imageEndpoint.distribution + "/" + id + "-" + size + ".png";
        }
    }]);

    return ImageController;
}();

module.exports = ImageController;