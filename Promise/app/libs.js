'use strict';

const fs = require('fs');
const path = require('path');

const DIR_PATH = __dirname + '/libs/';
const delExt = fileName => path.parse(fileName)['name'];
const libs = Object.create(null);


const names = fs.readdirSync(DIR_PATH).map(delExt);

for (const value of names) {
  const lib = require(`${DIR_PATH}${value}`);
  libs[value] = lib;
}

module.exports = libs;
