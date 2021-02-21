'use strict';

const fs = require('fs');

const delExt = require('./libs.js').delext;

const templates = Object.create(null);
const DIR_PATH = __dirname + '/templates/';

const names = fs.readdirSync(DIR_PATH).reduce(delExt, []);

for (const value of names) {
  const template = require(`${DIR_PATH}${value}`);
  templates[value] = template;
}

module.exports = templates;
