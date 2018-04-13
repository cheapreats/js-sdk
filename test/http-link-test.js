const assert = require('assert');

const TEST_HTTP_ENDPOINT = 'https://cheapreats-qa-graphql.azurewebsites.net/vendor_expo_token';

describe('HttpLink', () => {
    describe('#run', function() {
        this.timeout(60000);
        it('should run GET request', function(done) {
            const HttpLink = require('../app/links/synchronouslinks/HttpLink');
            let link = new HttpLink("http://ssl.jackzh.com");
            link.run({
                method: "get"
            }).then(data => {
                assert.equal(true, true);
                done();
            }).catch(e => {
                assert.equal(false, true);
                done();
            });
        });

        it('should run GET request using get()', function(done) {
            const HttpLink = require('../app/links/synchronouslinks/HttpLink');
            let link = new HttpLink("http://ssl.jackzh.com");
            link.get().then(data => {
                assert.equal(true, true);
                done();
            }).catch(e => {
                assert.equal(false, true);
                done();
            });
        });

        it('should run POST request', function(done) {
            const HttpLink = require('../app/links/synchronouslinks/HttpLink');
            let link = new HttpLink(TEST_HTTP_ENDPOINT);
            link.run({
                method: "post",
                headers: {
                    authorization: 'b28397e0-3ebb-4d55-b71c-4dc86e69f545'
                },
                data: {
                    vendorToken: 'b28397e0-3ebb-4d55-b71c-4dc86e69f545',
                    tokenBody: "123"
                }
            }).then(data => {
                assert.equal(true, true);
                done();
            }).catch(e => {
                console.log(e);
                assert.equal(false, true);
                done();
            });
        });

        it('should run POST request using post()', function(done) {
            const HttpLink = require('../app/links/synchronouslinks/HttpLink');
            let link = new HttpLink("http://ssl.jackzh.com");
            link.post({
                data: {
                    vendorToken: 'b28397e0-3ebb-4d55-b71c-4dc86e69f545',
                    tokenBody: "123"
                }
            }).then(data => {
                assert.equal(true, true);
                done();
            }).catch(e => {
                assert.equal(false, true);
                done();
            });
        });
    });
});
