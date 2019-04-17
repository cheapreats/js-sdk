"use strict";

/**
 * Entry file for CheaprEats Node.js SDK
 * Author: Jun Zheng
 * License: UNLICENSED
 */

var App = require('./src/app/App');

var app = new App();
// Export a App instance
module.exports = app;

if (typeof window !== "undefined") {
  window.CE = app;
}