// var AWS = require('aws-sdk');

export function handle(event, context, callback) {  
  callback(null, { 
    message: 'Hello from TypeScript', 
    event
  });
};