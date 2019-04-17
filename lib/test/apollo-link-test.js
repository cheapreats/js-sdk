'use strict';

var assert = require('assert');

var TEST_GQL_ENDPOINT = 'https://cheapreats-qa-graphql.azurewebsites.net/graphql';

describe('ApolloLink', function () {
    describe('#constructor', function () {
        it('should set _url property', function () {
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            var link = new ApolloLink("https://google.ca");
            assert.equal(link._url, "https://google.ca");
        });

        it('should set headers if headers is set in configuration', function () {
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            var link = new ApolloLink("https://google.ca", {
                headers: {
                    authorization: "test auth"
                }
            });
            assert.deepEqual(link._headers, {
                authorization: "test auth"
            });
        });
    });

    describe('#query', function () {
        it('should return a promise', function () {
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            var link = new ApolloLink(TEST_GQL_ENDPOINT);
            var result = link.query({
                query: '\n                    query {\n                      systemInformation {\n                        version\n                      }\n                    }\n                '
            });
            assert.equal(result instanceof Promise, true);
        });

        it('should query successfully', function (done) {
            this.timeout(60000);
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            var link = new ApolloLink(TEST_GQL_ENDPOINT);
            var result = link.query({
                query: '\n                    query {\n                      systemInformation {\n                        version\n                      }\n                    }\n                '
            }).then(function (data) {
                assert.equal(true, true);
                done();
            }).catch(function () {
                assert.equal(false, true);
                done();
            });
        });

        it('should query fail for queries require authentication', function (done) {
            this.timeout(60000);
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            var link = new ApolloLink(TEST_GQL_ENDPOINT);
            var result = link.query({
                query: '\n                    query {\n                      theVendor {\n                        name\n                      }\n                    }\n                '
            }).then(function (data) {
                assert.equal(false, true);
                done();
            }).catch(function () {
                assert.equal(true, true);
                done();
            });
        });

        it('should query successfully for queries require authentication', function (done) {
            this.timeout(60000);
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            var link = new ApolloLink(TEST_GQL_ENDPOINT, {
                headers: {
                    authorization: 'b28397e0-3ebb-4d55-b71c-4dc86e69f545'
                }
            });
            var result = link.query({
                query: '\n                    query {\n                      theVendor {\n                        name\n                      }\n                    }\n                '
            }).then(function (data) {
                assert.equal(true, true);
                done();
            }).catch(function (e) {
                console.log(e);
                assert.equal(false, true);
                done();
            });
        });
    });

    describe('#run', function () {
        it('should return a promise if type is query', function () {
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            var link = new ApolloLink(TEST_GQL_ENDPOINT);
            var result = link.run({
                type: 'query',
                query: '\n                    query {\n                      systemInformation {\n                        version\n                      }\n                    }\n                '
            });
            assert.equal(result instanceof Promise, true);
        });
        // TODO: Mutation testing
        it('should query successfully', function (done) {
            this.timeout(60000);
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            var link = new ApolloLink(TEST_GQL_ENDPOINT);
            var result = link.run({
                type: 'query',
                query: '\n                    query {\n                      systemInformation {\n                        version\n                      }\n                    }\n                '
            }).then(function (data) {
                assert.equal(true, true);
                done();
            }).catch(function () {
                assert.equal(false, true);
                done();
            });
        });

        it('should query fail for queries require authentication', function (done) {
            this.timeout(60000);
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            var link = new ApolloLink(TEST_GQL_ENDPOINT);
            var result = link.run({
                type: 'query',
                query: '\n                    query {\n                      theVendor {\n                        name\n                      }\n                    }\n                '
            }).then(function (data) {
                assert.equal(false, true);
                done();
            }).catch(function () {
                assert.equal(true, true);
                done();
            });
        });

        it('should query successfully for queries require authentication', function (done) {
            this.timeout(60000);
            var ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            var link = new ApolloLink(TEST_GQL_ENDPOINT, {
                headers: {
                    authorization: 'b28397e0-3ebb-4d55-b71c-4dc86e69f545'
                }
            });
            var result = link.run({
                type: 'query',
                query: '\n                    query {\n                      theVendor {\n                        name\n                      }\n                    }\n                '
            }).then(function (data) {
                assert.equal(true, true);
                done();
            }).catch(function (e) {
                console.log(e);
                assert.equal(false, true);
                done();
            });
        });
    });
});