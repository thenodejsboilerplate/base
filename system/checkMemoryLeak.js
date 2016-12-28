'use strict';
let http = require('http');
let url = require('url');

let leakArray = [];
let leak = function(){
  leakArray.push('leak' + Math.random());
};
let app = http.createServer(function(req,res){
  //leak();
 // console.log(JSON.stringify(leakArray));
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');

});

app.on('request', function(req,res){
  console.log(`there is a request. `);
  let url_parts = url.parse(req.url, true);
  switch(url_parts.pathname){
    case '/':
      leak();
      console.log(JSON.stringify(leakArray));
      res.write('<html><body>Home page!</body></html>');
      break;
    case '/home':
      //redirecting to a different url
      res.statusCode = 302;
      res.setHeader('Location', '/');
      break;
    default:
      res.write('Unknow path: ' + JSON.stringify(url_parts));
      
  }
  res.end();
    // response.end() must be called on each response to finish the response and close the connection.

});



app.listen(8000)
console.log('Server running at http://localhost:8000');