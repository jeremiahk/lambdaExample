# AWS Lambda Help Guide

This demo has the following goals...
- [x] Create a lambda locally and see that on AWS.
- [x] Use TDD with the lambda.
- [x] Mock AWS objects for our unit tests.
- [x] Integrate with our CI (Gitlab) to push lambda to AWS if test pass.
- [ ] Run lambda locally. 
- [ ] Use typescript with the lambda.

Below we will work through each of these goals and see how the issue was solved. 

##### Note at this point in time, the code in the project does not follow the normal lambda structure. We are still testing some tools and frameworks. 

## Create a lambda locally 
We use a tool called [Apex](http://apex.run/) to create and deploy the lambda. You must have the AWS CLI tools installed on your machine, but then you can use Apex to initialize a basic lambda with 

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

You can trigger the lambda on AWS via th 

    apex invoke 'lambda name'

## Use TDD with the lambda.
We are using [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) to run our unit test. There is nothing special required to work with the lambda.

## Mock AWS objects for our unit tests.