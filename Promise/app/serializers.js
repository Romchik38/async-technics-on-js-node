'use strict';

const fs = require('fs');
const path = require('path');

const delExt = fileName => path.parse(fileName)['name'];
const serializers = Object.create(null);
const DIR_PATH = __dirname + '/serializers/';
const names = fs.readdirSync(DIR_PATH).map(delExt);

for (const value of names) {
  const serializer = require(`${DIR_PATH}${value}`);
  serializers[value] = serializer;
}

module.exports = serializers;
