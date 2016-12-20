'use strict';
const home = require('./frontend/home');

module.exports   = function(app) {
  app.use('/',home);  
};
