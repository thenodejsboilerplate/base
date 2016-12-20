'use strict';

const	debug = require('./src/libs/logger');
const	config = require('./src/common/get-config');
const	mongoose = require('mongoose');
const	express = require('express');
require('./src/libs/mongoose-connect');

const	app = express(); 
require('./src/libs/helmet')(app);

require('./src/routes/routes')(app);
app.use(express.static(__dirname + '/src/public'));
//static中间件可以将一个或多个目录指派为包含静态资源的目录,其中资源不经过任何特殊处理直接发送到客户端,如可放img,css。 设置成功后可以直接指向、img/logo.png,static中间件会返回这个文件并正确设定内容类型

app.use(function(req,res,next){
  res.status(404);
  res.json('404');
});

app.use(function(err,req,res,next){
  res.json('505');
});

app.listen(config.port, function(){
  console.log(`Express started on http://localhost + ${config.port} ;press Ctrl-C to terminate`);
});
module.exports = app;
