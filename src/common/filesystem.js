'use strict';
const fs = require('fs');
const { resolve, dirname } = require('path');
const log = require('debug')('debug');

const mkdir = (dirpath) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirpath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const exists = (dirpath) => {
  return new Promise((resolve, reject) => {
    fs.stat(dirpath, (err, stats) => {
      if(err) {
        reject(err);
      }
      resolve(stats);
    });
  });
};


/**
 * 遍历该文件夹，获取所有文件。
 *
 * @param  {String} dirname 文件夹路径
 * @return {[String]}         文件路径的数组
 */
const readdir = (dirname) => {
  return fs.readdirSync(dirname).map(filename => {
    const filePath = resolve(dirname, filename);
    const stat = fs.statSync(filePath);
    if(stat.isDirectory())
      return readdir(filePath);
    else if(stat.isFile())
      return [filePath];
  }).reduce((files, e) => [...files, ...e], []);
};

/**
 * 根据dirpath创建文件夹，如果此文件夹的上级目录不存在，则会递归创建
 *
 * @param {String} dirpath 文件夹路径
 * @return {Promise}
 */
const mkdirRecursion = (dirpath) => {
  return exists(dirpath)
    .then(function(stats){
      log('File Eixst');
      return Promise.resolve();
    })
    .catch((err) => {
      if(err.code === 'ENOENT'){
        return mkdirRecursion(dirname(dirpath))
            .then(() => {
              return mkdir(dirpath);
            });
      }
      throw new Error('文件不可使用');
      // return Promise.resolve();
    });
};

const mkdirSync = (dirpath) => {
  try {
    let exist = fs.existsSync(dirpath);
    if(!exist) {
      log('making dir'+ resolve(dirpath));
      fs.mkdirSync(dirpath);
    }
  } catch (e) {
    throw new Error('文件不可使用');
  }
  log('crreated'+ resolve(dirpath));
  return;
};

module.exports = {
  readdir,
  mkdirRecursion,
  mkdirSync
};
