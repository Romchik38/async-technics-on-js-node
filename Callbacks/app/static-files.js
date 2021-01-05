'use strict';

const fs = require('fs');
const DIR_PATH = __dirname + '/../public';

const staticFiles = (url, callback) => {
  const path = DIR_PATH + url;
  fs.readFile(path, callback);
};

module.exports = staticFiles;
