'use strict';
const config = require('../../src/common/get-config');
const mongodb = config.mongodb;
const mongoose = require('mongoose');

mongoose.connect(mongodb.uri, mongodb.options, function(err) {
  if(err) {
    console.error(`mongodb error : ${err.message ? err.message : err.stack}`);
    process.exit(0);
  }
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose connected');
}); 

// If the connection throws an error
// mongoose.connection.on('error',function (err) {  
//   console.log('Mongoose default connection error: ' + err);
// }); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
