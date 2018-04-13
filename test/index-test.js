const assert = require('assert');

describe('index', () => {
   describe('#main', () => {
      it('should return a App instance', () => {
         const app = require('../index');
         const App = require('../app/App');
         assert.equal(app instanceof App, true);
      });
   });
});
