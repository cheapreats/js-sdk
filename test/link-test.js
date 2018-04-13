const assert = require('assert');

describe('Link', () => {
    describe('#constructor', () => {
        it('should set _url property', () => {
            const Link = require('../app/links/Link');
            let link = new Link("https://google.ca");
            assert.equal(link._url, "https://google.ca");
        });
    });
});
