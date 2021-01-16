'use strict';

const fs = require('fs');
const databaseCb  = require('./database-cb.js');
const nonBlockCbFn = require('./libs')['non-block-cb-fn'];
const DIR_PATH = __dirname + '/../database/';

const read = (fileName, callback) => {
  const file = DIR_PATH + fileName + '.json';
  fs.readFile(file, 'utf8', callback);
};

const serializers = {
  'select': (query, callback) => {
    const { table, cb } = query;
    read(table, (err, data) => {
      if (err) {
        console.log(err);
        err.statusCode = 500;
        err.messageClient  = 'error read data';
        callback(err);
        return;
      }
      //dosomething with cb
      const result =  JSON.parse(data);
      nonBlockCbFn(result.slice(), (err, data) => {
        callback(null, data);
      }, cb, 200);
    });
  },
};

const database = (req, callback) => {
  const { table, operation, cbParam } = req;
  const serializer = serializers[operation];
  const cbName = cbParam[0];
  const cbObj = cbParam[1];
  const cb = databaseCb[cbName].bind(cbObj);
  serializer({ table, cb }, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
};

module.exports = database;
