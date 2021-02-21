'use strict';

const fs = require('fs');
const readFile = fs.promises.readFile;
const readFileTimed = file => new Promise((resolve, reject) => {
  readFile(file, 'utf8')
    .then(data => {
        resolve(data);
    }, err => {
      reject(err);
    });
});

const DIR_PATH = __dirname + '/../../database/';

const readJson = async fileName => {
  const file = DIR_PATH + fileName + '.json';
  try {
    const data = await readFileTimed(file, 'utf8');
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
