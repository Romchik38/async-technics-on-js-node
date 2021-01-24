'use strict';

const database = require('../database.js');
const databaseQueries = require('../database-queries.js');
const template = require('../templates.js')['user'];
const pageGeneralParameters = require('../libs.js')['page-general-parameters'];
const copyObj = require('../libs.js')['copy-obj'];

const dq = copyObj(databaseQueries);
const queryUsers = dq['queryUsers'];
const queryMenu = dq['queryMenu'];
const queryUrl = dq['queryUrl'];

const user = params => new Promise((resolve, reject) => {
  queryUrl.cbParam[1].url = params.url;
  queryUsers.cbParam[0] = 'url';          //  {отличие от category -
  queryUsers.cbParam[1].url = params.url; //  выбираем только одного польз-я}
  const dataReq1 = database(queryUsers);
  const dataReq2 = database(queryUrl);
  const dataReq3 = database(queryMenu);
  Promise.all([
    dataReq1,
    dataReq2,
    dataReq3
  ]).catch(err => {
    reject(err);
  }).then(values => {
    try {
      const [dataUsers, dataUrls, dataMenu] = values;
      const page = pageGeneralParameters(dataUrls[0], dataMenu);
      page['user'] = dataUsers[0];//отличие от category, передаем 1 польз-я
      const html = template(page);
      resolve(html);
    } catch (err) {
      reject(err);
    }
  });
});

module.exports = user;
