// var AWS = require('aws-sdk');

export function handler(event, context, callback) {  
  callback(null, { 
    message: 'Hello from TypeScript!', 
    event
  });
};