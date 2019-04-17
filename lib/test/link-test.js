'use strict';

var assert = require('assert');

describe('Link', function () {
    describe('#constructor', function () {
        it('should set _url property', function () {
            var Link = require('../app/links/Link');
            var link = new Link("https://google.ca");
            assert.equal(link._url, "https://google.ca");
        });
    });
});