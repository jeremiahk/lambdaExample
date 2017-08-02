var expect = require("chai").expect;
var Surveys = require('../functions/hello');

describe("Index Tests", function() {
  describe("hello world tests", function() {
    it('The index function should have worked', function(done) {
      var surveyIsValid = Surveys.isSurveyComplete('1');
      expect(surveyIsValid).to.be.true;
      done();
    });

    it('The index function should not have worked', function(done) {
      var surveyIsValid = Surveys.isSurveyComplete('0');
      expect(surveyIsValid).to.be.true;
      done();
    });
  });
});
