// var AWS = require('aws-sdk');

export function hello(event, context, callback) {  
  callback(null, { 
    message: 'Hello from TypeScript!', 
    event
  });
};