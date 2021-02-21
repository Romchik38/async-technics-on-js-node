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

const undef = async obj => {
  const { request } = obj;
  try {
    const data = await staticFiles(request.url);
    const writeHead = [200, {
      'Content-Type': contentType[getExt(request.url)] || 'text/plain',
    }];
    return { data, writeHead };
  } catch (err) {
    const error = new Error('file not found');
    return error;
  }
};

module.exports = undef;
