'use strict';

const staticFiles = require('../static-files.js');
const getExt = require('../libs.js')['getext'];

const contentType = {
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.css': 'text/css',
  '.png': 'image/png',
};

const undef = obj => {
  const { req, res } = obj;
  //something on start;
  staticFiles(req.url, (err, data) => {
    if (err) {
      console.log(err);
      const writeHead = [404];
      res.writeHead(...writeHead);
      res.end('404 error - page not found');
      return;
    }
    const writeHead = [200, {
      'Content-Type': contentType[getExt(req.url)],
    }];
    res.writeHead(...writeHead);
    res.end(data);
    return;
  });
  //something on end;

};

module.exports = undef;
