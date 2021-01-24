'use strict';

const fs = require('fs');
const databaseCb  = require('./database-cb.js');
const nonBlockCbFn = require('./libs')['non-block-cb-fn'];
const DIR_PATH = __dirname + '/../database/';

const read = fileName => new Promise((resolve, reject) => {
  const file = DIR_PATH + fileName + '.json';
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const serializers = {
  'select': query => new Promise((resolve, reject) => {
    const { table, cb } = query;
    read(table)
      .then(data => {
        //dosomething with cb
        const result =  JSON.parse(data);
        nonBlockCbFn(result.slice(), cb, 200)
          .then(data => {
            resolve(data);
          }).catch(err => {
            console.log(err);
            err.statusCode = 500;
            err.messageClient  = 'error select data';
            reject(err);
          });
      }).catch(err => {
        console.log(err);
        err.statusCode = 500;
        err.messageClient  = 'error read data';
        reject(err);
        return;
      });
  }),
};

const database = req => new Promise((resolve, reject) => {
  const { table, operation, cbParam } = req;
  const serializer = serializers[operation];
  const [cbName, cbObj] = cbParam;
  const cb = databaseCb[cbName].bind(cbObj);
  serializer({ table, cb })
    .then(data => {
      resolve(data);
    }).catch(err => {
      reject(err);
    });
});

module.exports = database;
