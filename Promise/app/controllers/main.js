'use strict';

const database = require('../database.js');
const template = require('../templates.js')['main'];
const databaseQueries = require('../database-queries.js');
const pageGeneralParameters = require('../libs.js')['page-general-parameters'];
const copyObj = require('../libs.js')['copy-obj'];

const dq = copyObj(databaseQueries);
const queryUrl = dq['queryUrl'];
const queryMenu = dq['queryMenu'];

const main = (params) => new Promise((resolve, reject) => {
  queryUrl.cbParam[1].url = params.url;
  const dataReq1 = database(queryUrl);
  const dataReq2 = database(queryMenu);
  Promise.all([
    dataReq1,
    dataReq2,
  ]).then(values => {
    const [dataUrls, dataMenu] = values;
    const page = pageGeneralParameters(dataUrls[0], dataMenu);
    const html = template(page);
    resolve(html);
  }, err => {
    reject(err);
  }).catch(err => {
    reject(err);
  });
});

module.exports = main;
