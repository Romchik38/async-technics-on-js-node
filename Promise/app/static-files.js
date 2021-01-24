'use strict';

const fs = require('fs');
const DIR_PATH = __dirname + '/../public';

const staticFiles = url => new Promise((resolve, reject) => {
  const path = DIR_PATH + url;
  fs.readFile(path, (err, data) => {
    if (err) reject(err);
    else {
      resolve(data);
    }
  });
});

module.exports = staticFiles;
