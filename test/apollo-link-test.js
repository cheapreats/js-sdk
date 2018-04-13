const assert = require('assert');

const TEST_GQL_ENDPOINT = 'https://utsc-food.azurewebsites.net/graphql';


describe('Link', () => {
    describe('#constructor', () => {
        it('should set _url property', () => {
            const ApolloLink = require('../app/links/synchronouslinks/ApolloLink');
            // const ApolloClient = require('apollo-boost');
            let link = new ApolloLink("https://google.ca");
            assert.equal(link._url, "https://google.ca");
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
        it('should query successfully', (done) => {
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
    })
});
