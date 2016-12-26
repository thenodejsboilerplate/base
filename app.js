'use strict';

const logger = require('./src/libs/logger');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

// var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const	app = express();

require('./src/libs/mongoose-connect');
// static中间件可以将一个或多个目录指派为包含静态资源的目录,其中资源不经过任何特殊处理直接发送到客户端,如可放img,css。 设置成功后可以直接指向、img/logo.png,static中间件会返回这个文件并正确设定内容类型
//do use path.join(), since it'll generate effective slashes according to different systems(unix/window..)


app.use(express.static(path.join(__dirname,'src/public')));
app.set('views', path.join(__dirname, 'src/views'));

const env = process.env.NODE_ENV || 'test';


require('./src/libs/helmet')(app);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

//HTTP request logger middleware for node.js
app.use(morgan('dev'));


// examples for learning purposes
require('./examples/file');

//routes
require('./src/routes/routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('404 Page Not Found');
  logger.error(`Error: ${err.message}`);
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  let error = env === 'test' ? (err.message ? err.message : err.stack) : 'error';
  logger.error(`Error: ${err.message ? err.message : err.stack}`);
  res.status(err.status || 500);
  res.json(error);
});

module.exports = app;
