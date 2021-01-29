'use strict';

const fs = require('fs');
const readFile = fs.promises.readFile;

const DIR_PATH = __dirname + '/../../database/';

const readJson = async fileName => {
  const file = DIR_PATH + fileName + '.json';
  try {
    const data = await readFile(file, 'utf8');
    try {
      const json = JSON.parse(data);
      return json;
    } catch (err) {
      throw new Error(err);
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = readJson;
