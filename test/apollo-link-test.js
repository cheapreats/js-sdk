const assert = require('assert');

const TEST_GQL_ENDPOINT = 'https://cheapreats-qa-graphql.azurewebsites.net/graphql';


describe('ApolloLink', () => {
    describe('#constructor', () => {
        it('should set _url property', () => {
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            let link = new ApolloLink("https://google.ca");
            assert.equal(link._url, "https://google.ca");
        });

        it('should set headers if headers is set in configuration', () => {
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            let link = new ApolloLink("https://google.ca", {
                headers: {
                    authorization: "test auth"
                }
            });
            assert.deepEqual(link._headers, {
                authorization: "test auth"
            });
        });

    });

    describe('#query', () => {
        it('should return a promise', () => {
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            let link = new ApolloLink(TEST_GQL_ENDPOINT);
            let result = link.query({
                query: `
                    query {
                      systemInformation {
                        version
                      }
                    }
                `
            });
            assert.equal(result instanceof Promise, true);
        });

        it('should query successfully', function(done) {
            this.timeout(60000);
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            let link = new ApolloLink(TEST_GQL_ENDPOINT);
            let result = link.query({
                query: `
                    query {
                      systemInformation {
                        version
                      }
                    }
                `
            }).then(data => {
                assert.equal(true, true);
                done();
            }).catch(() => {
                assert.equal(false, true);
                done();
            });
        });

        it('should query fail for queries require authentication', function(done) {
            this.timeout(60000);
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            let link = new ApolloLink(TEST_GQL_ENDPOINT);
            let result = link.query({
                query: `
                    query {
                      theVendor {
                        name
                      }
                    }
                `
            }).then(data => {
                assert.equal(false, true);
                done();
            }).catch(() => {
                assert.equal(true, true);
                done();
            });
        });

        it('should query successfully for queries require authentication', function(done) {
            this.timeout(60000);
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            let link = new ApolloLink(TEST_GQL_ENDPOINT, {
                headers: {
                    authorization: 'b28397e0-3ebb-4d55-b71c-4dc86e69f545'
                }
            });
            let result = link.query({
                query: `
                    query {
                      theVendor {
                        name
                      }
                    }
                `
            }).then(data => {
                assert.equal(true, true);
                done();
            }).catch((e) => {
                console.log(e);
                assert.equal(false, true);
                done();
            });
        });
    });

    describe('#run', () => {
        it('should return a promise if type is query', () => {
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            let link = new ApolloLink(TEST_GQL_ENDPOINT);
            let result = link.run({
                type: 'query',
                query: `
                    query {
                      systemInformation {
                        version
                      }
                    }
                `
            });
            assert.equal(result instanceof Promise, true);
        });
        // TODO: Mutation testing
        it('should query successfully', function(done) {
            this.timeout(60000);
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            let link = new ApolloLink(TEST_GQL_ENDPOINT);
            let result = link.run({
                type: 'query',
                query: `
                    query {
                      systemInformation {
                        version
                      }
                    }
                `
            }).then(data => {
                assert.equal(true, true);
                done();
            }).catch(() => {
                assert.equal(false, true);
                done();
            });
        });

        it('should query fail for queries require authentication', function(done) {
            this.timeout(60000);
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            let link = new ApolloLink(TEST_GQL_ENDPOINT);
            let result = link.run({
                type: 'query',
                query: `
                    query {
                      theVendor {
                        name
                      }
                    }
                `
            }).then(data => {
                assert.equal(false, true);
                done();
            }).catch(() => {
                assert.equal(true, true);
                done();
            });
        });

        it('should query successfully for queries require authentication', function(done) {
            this.timeout(60000);
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            let link = new ApolloLink(TEST_GQL_ENDPOINT, {
                headers: {
                    authorization: 'b28397e0-3ebb-4d55-b71c-4dc86e69f545'
                }
            });
            let result = link.run({
                type: 'query',
                query: `
                    query {
                      theVendor {
                        name
                      }
                    }
                `
            }).then(data => {
                assert.equal(true, true);
                done();
            }).catch((e) => {
                console.log(e);
                assert.equal(false, true);
                done();
            });
        });
    })
});
