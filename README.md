# AWS Lambda Help Guide

This demo has the following goals...
- [x] Create a lambda locally and be able to push that to AWS.
- [x] Use TDD with the lambda.
- [x] Mock AWS objects for our unit tests.
- [x] Integrate with our CI (Gitlab) to push lambda to AWS if test pass.
- [x] Run lambda locally.
- [x] Use typescript with the lambda.

Below we will work through each of these goals and see how the issue was solved.

##### Note at this point in time, the code in the project does not follow the normal lambda structure. We are still testing some tools and frameworks.

## Create a lambda locally
We use a tool called [Apex](http://apex.run/) to create and deploy the lambda. You must have the AWS CLI tools installed, and have your credentials saved locally but then you can use Apex to initialize a basic lambda with

```
apex init

           / \  |  _ \| ____\ \/ /
          / _ \ | |_) |  _|  \  /
         / ___ \|  __/| |___ /  \
        /_/   \_\_|   |_____/_/\_\

Enter the name of your project. It should be machine-friendly, as this
is used to prefix your functions in Lambda.

Project name: sloths

Enter an optional description of your project.

Project description: My slothy project

[+] creating IAM sloth_lambda_function role
[+] creating IAM sloth_lambda_logs policy
[+] attaching policy to lambda_function role.
[+] creating ./project.json
[+] creating ./functions

Setup complete, deploy those functions!
```

Then you can deploy the lambda to AWS with

    apex deploy

You can trigger the lambda on AWS with

    apex invoke 'lambda name'

## Use TDD with the lambda.
We are using [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) to run our unit test. There is nothing special required to work with the lambda.

## Mock and spying on AWS objects.
#### Mocking
When testing our code we dont want to call actual AWS services. We must mock these services so we can control what is returned. With this ability we can test all possible return objects in our unit tests. We use [aws-sdk-mock](https://www.npmjs.com/package/aws-sdk-mock) to achieve this.

With aws-sdk-mock you must specify what service and what function you want to mock.

```javascript
AWSMock.mock('DynamoDB', 'putItem', function(params, callback) {
    callback(null, 'success');
})
```

In this example, when the code calls DynamoDB().putItem() the return closure passed into the function will receive a null error and the string 'success'. Normally you would want to return a JSON object that mimics what AWS sends back. This is just an example.

There is a small issue we have not resolved with this mocking package. You must setup your mocking functions before the aws-sdk is instantiated inside your code.

#### Spying
You can also use a spying framework with aws-sdk-mock. We are using [Sinon](http://sinonjs.org).

```javascript
var listTableSpy = sinon.spy();
AWSMock.mock('DynamoDB', 'listTables', listTableSpy);

var surveys = new Surveys();
surveys.testAWSSpy();

expect(listTableSpy.calledOnce).to.be.true;
```

In this example you create the Sinon spy and insert it into DynamoDB.listTables function. In testAWSSpy() function we are calling listTables. The we can assert that the spy has been called once.

## Integrate with our CI (Gitlab) to push lambda to AWS if test pass.
We use Gitlab runner as our CI service. You must add a couple of enviroment variables for it to work. The AWS_Region, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY. The key ID a secret must be added in the secure pipeline settings of the project. If we add them to the .gitlab-ci.yml file then they will be visible to everyone.

After that the CI service is like most other projects. We make sure our npm packages our up to date `npm install` Then we run our tests `npm test` Then we use Apex to deploy our lambda `apex deploy`.

## Run lambda locally.
We use the package [aws-lambda-local](https://github.com/Max-Kolodezniy/aws-lambda-local) to run the package. You must install the package globally. It prints your output and lets you specify a custom event. To run the project use the command...

    lambda-local -f index.js -e event.json

Or in the case of our example project you can use

    npm run-script run

You can see we have added the run script to the package.json

## Use typescript with the lambda.
This readme will not explain how to use typescript. To read more about it go [here](https://www.typescriptlang.org/)

```typescript
export function handle(event, context, callback) {  
  callback(null, {
    message: 'Hello from TypeScript',
    event
  });
};
```

The typescript above gets compiled down to..

```javascript
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function handler(event, context, callback) {
    callback(null, {
        message: 'Hello from TypeScript!',
        event: event
    });
}
exports.handle = handler;
;
//# sourceMappingURL=index.js.map
```

Note you must name your function handle for it to work correctly on AWS.

The command `npm run build` has been added to the package.json. This command is called by gitlab-runner before pushing the code to AWS.
