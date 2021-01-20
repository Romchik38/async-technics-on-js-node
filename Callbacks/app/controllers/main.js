'use strict';

const database = require('../database.js');
const template = require('../templates.js')['main'];
const databaseQueries = require('../database-queries.js');
const pageGeneralParameters = require('../libs.js')['page-general-parameters'];
const copyObj = require('../libs.js')['copy-obj'];

const dq = copyObj(databaseQueries);

const main = (params, callback) => {
  //do database request
  const queryUsers = dq['queryUsers'];
  const queryUrl = dq['queryUrl'];
  queryUrl.cbParam[1].url = params.url;
  const queryMenu = dq['queryMenu'];
  //first request
  database(queryUsers, (err, dataUsers) => {
    if (err) {
      callback(err);
      return;
    }
    ///working with data
    //....
    //second request
    database(queryUrl, (err, dataUrls) => {
      if (err) {
        callback(err);
        return;
      }
      ///working with data
      //..
      const page = dataUrls[0];
      page['Users'] = dataUsers;
      //third request
      database(queryMenu, (err, dataMenu) => {
        if (err) {
          callback(err);
          return;
        }
        ///working with data
        //..
        const html = template(pageGeneralParameters(page, dataMenu));
        //final
        //sending result to serializer
        callback(null, html);
      });
    });
  });
};

module.exports = main;
