const assert = require('assert');

const TEST_HTTP_ENDPOINT = 'https://cheapreats-qa-graphql.azurewebsites.net/';

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
    });
});
