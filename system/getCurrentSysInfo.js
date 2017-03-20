'use strict';
let os = require('os'),
  exec = require('child_process').exec,
  co_handler = require('../src/common/co-route-handler'),
  promisify = require('../src/libs/promisify'),
  config = require('../src/common/get-config'),
  logger = require('../src/libs/logger'),
  started_at = new Date();

module.exports = co_handler(function*(req, res, next){
  let connections = [],
    swap = {};
  logger.debug('into info');

  
  let port80 = yield promisify.childProcessExec('netstat -an | grep :80 | wc -l');
  let portDynamic = yield promisify.childProcessExec(`netstat -an | grep :${config.port} | wc -l`);
  //let getSwap = yield promisify.childProcessExec('vmstat -SM -s | grep "used swap" | sed -E "s/[^0-9]*([0-9]{1-8}).*/\\1/"');
  logger.debug('port80, portDynamic, getSwap' + port80, portDynamic);
  connections['80'] = parseInt(port80, 10);
  connections[config.port] = parseInt(portDynamic, 10);
  //swap = getSwap;

  logger.debug('above res.json');
  res.json({
    status: 'up',
		//version: 
    started_at: started_at,
    node: {
      version: process.version,
      memoryUsage: `${Math.round(process.memoryUsage().rss / 1024 /1024)} M`,
      uptime: process.uptime()
    },
    system: {
      loadavg: os.loadavg(),
      freeMemory: Math.round(`${os.freemem()/1024/1024} M`),
    },
    env: process.env.NODE_ENV,
    hostname: os.hostname(),
    connections: connections,
    swap: swap
  });

    

});


