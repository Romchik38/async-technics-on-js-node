'use strict';

const staticFiles = require('../static-files.js');
const getExt = require('../libs.js')['getext'];

const contentType = {
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.css': 'text/css',
  '.png': 'image/png',
  '.html': 'text/html',
};

const undef = obj => {
  const { req, res } = obj;
  //something on start;
  staticFiles(req.url)
    .then(data => {
      const writeHead = [200, {
        'Content-Type': contentType[getExt(req.url)] || 'text/plain',
      }];
      res.writeHead(...writeHead);
      res.end(data);
      return;
    }).catch(err => {
      console.log(err);
      const writeHead = [404];
      res.writeHead(...writeHead);
      res.end('404 error - page not found');
      return;
    });
};

module.exports = undef;
