'use strict';

const fs = require('fs');
const path = require('path');

const delExt = fileName => path.parse(fileName)['name'];
const controllers = Object.create(null);
const DIR_PATH = __dirname + '/controllers/';

const names = fs.readdirSync(DIR_PATH).map(delExt);

for (const value of names) {
  const controller = require(`${DIR_PATH}${value}`);
  controllers[value] = controller;
}

module.exports = controllers;
