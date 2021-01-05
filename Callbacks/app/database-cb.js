'use strict';

const fs = require('fs');

const delExt = require('./libs.js').delext;

const databaseCb = Object.create(null);
const DIR_PATH = __dirname + '/database-cb/';

const names = fs.readdirSync(DIR_PATH).reduce(delExt, []);

for (const value of names) {
  const cb = require(`${DIR_PATH}${value}`);
  databaseCb[value] = cb;
}

module.exports = databaseCb;
