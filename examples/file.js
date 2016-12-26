'use strict';
const fs = require('fs');
const promisify = require('../src/libs/promisify');

// helper.readFile('./README.md').then(function(data){
//   console.log(JSON.stringify(data,null,' '));
// });
promisify.readFile('./README.md',function(err,data){ 
  console.log(JSON.stringify(data,null,' '));
});
