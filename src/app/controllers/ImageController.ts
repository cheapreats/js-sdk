const HttpLink = require("../links/synchronouslinks/HttpLink");
//PR - ts is okay with only decalring it in one spot, but does that actually makes sense to do? Maybe include a ignore in the tsconfig?
/**
 * Controller for image services.
 */
class ImageController {
  app: any;
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
  getHttpLink(append: string = "") {
    return new HttpLink(
      this.app.getConfiguration().endpoints.imageEndpoint.production + append
    );
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Upload an new image
   * @param {string} image - Image in base64 format
   * @returns {Promise<any>}
   */

  upload(image: string): Promise<any> {
    const link = this.getHttpLink("/upload");
    return new Promise((resolve, reject) => {
      link
        .post({
          data: {
            image
          }
        })
        .then((result: { data: any }) => {
          resolve(result.data);
        })
        .catch((e: any) => {
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
  getLink(id: string, size: string): string {
    return (
      this.app.getConfiguration().endpoints.imageEndpoint.distribution +
      "/" +
      id +
      "-" +
      size +
      ".png"
    );
  }
}

module.exports = ImageController;
