var AWS = require('aws-sdk');

class Surveys {
  constructor() {
    this.foo = false;
    this.DB = new AWS.DynamoDB();
  }

  testAWSSpy() {
    this.DB.listTables(null, function(err, data) {
      this.foo = true;
    });
  }

  testAWSDynamoDBPutItem() {
    var params = {
      Item: {
        'value': { 
          S: 'failure' 
        } 
      }, 
      TableName: 'Test'
    }

    this.DB.putItem(params, (err, data) => {
      if (data == 'success') {
        this.foo = true;
      } 
    });
  }
};

module.exports = Surveys;