'use strict';

var assert = require('assert');

var TEST_HTTP_ENDPOINT = 'https://cheapreats-qa-graphql.azurewebsites.net/';

describe('HttpLink', function () {
    describe('#run', function () {
        this.timeout(60000);
        it('should run GET request', function (done) {
            var HttpLink = require('../app/links/synchronouslinks/HttpLink');
            var link = new HttpLink("http://ssl.jackzh.com");
            link.run({
                method: "get"
            }).then(function (data) {
                assert.equal(true, true);
                done();
            }).catch(function (e) {
                assert.equal(false, true);
                done();
            });
        });

        it('should run GET request using get()', function (done) {
            var HttpLink = require('../app/links/synchronouslinks/HttpLink');
            var link = new HttpLink("http://ssl.jackzh.com");
            link.get().then(function (data) {
                assert.equal(true, true);
                done();
            }).catch(function (e) {
                assert.equal(false, true);
                done();
            });
        });
    });
});