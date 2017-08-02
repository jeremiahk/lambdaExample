var expect = require("chai").expect;

describe("Index Tests", function() {
  describe("hello world tests", function() {
    it('The index function should have worked', function(done) {
      expect(true).to.be.true;
      done();
    });

    it('The index function should not have worked', function(done) {
      expect(false).to.be.true;
      done();
    });
  });
});
