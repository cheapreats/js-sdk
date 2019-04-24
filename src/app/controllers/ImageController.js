const HttpLink = require('../links/synchronouslinks/HttpLink');

/**
 * Controller for image services.
 */
class ImageController {
    constructor(app) {
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
    getHttpLink(append = "") {
        return new HttpLink(this.app.getConfiguration().endpoints.imageEndpoint.production + append);
    }

    /**
     * Upload an new image
     * @param image - Image in base64 format
     * @returns {Promise<any>}
     */
    upload(image) {
        const link = this.getHttpLink("/upload");
        return new Promise((resolve, reject) => {
            link
                .post({
                    data: {
                        image
                    }
                })
                .then(result => {
                    resolve(result.data);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    /**
     * Get an image link with size
     * @param {string} id
     * @param {string} size (100px, 300px, 600px or 1200px)
     * @returns {string}
     */
    getLink(id, size) {
        return this.app.getConfiguration().endpoints.imageEndpoint.distribution + "/" + id + "-" + size + ".png";
    }

}

module.exports = ImageController;
