var expect = require("chai").expect;
var sinon = require('sinon');
var Surveys = require('../functions/surveys');
var AWSMock = require('aws-sdk-mock');

describe("Index Tests", function() {
    // This test creates a spy that can watch the DynamoDB.listTables function and report what happens.
    // it('This is a spy example', function(done) {
    //     var listTableSpy = sinon.spy();
    //     AWSMock.mock('DynamoDB', 'listTables', listTableSpy);

    //     var surveys = new Surveys();
    //     surveys.testAWSSpy();

    //     expect(listTableSpy.calledOnce).to.be.true;
    //     AWSMock.restore()
    //     done();
    // });

    // // This test injects the string 'success' into the response the the DynamoDB.putItem function would normally return to the callback.
    // it('This is the dynamoDB injection example', function(done) {
    //     AWSMock.mock('DynamoDB', 'putItem', function(params, callback) {
    //         callback(null, 'success');
    //     })

    //     var surveys = new Surveys();

    //     surveys.testAWSDynamoDBPutItem();

    //     expect(surveys.foo).to.be.true;
    //     done();
    // })
});
