'use strict';

var assert = require('assert');

describe('index', function () {
   describe('#main', function () {
      it('should return a App instance', function () {
         var app = require('../index');
         var App = require('../app/App');
         assert.equal(app instanceof App, true);
      });
   });
});