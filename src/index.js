/**
 * Entry file for CheaprEats Node.js SDK
 * Author: Jun Zheng
 * License: UNLICENSED
 */

const App = require("./app/App");

let app = new App();
// Export a App instance
module.exports = app;

if (typeof window !== "undefined") {
  window.CE = app;
}
