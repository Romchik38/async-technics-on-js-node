'use strict';

const database = require('../database.js');
const databaseQueries = require('../database-queries.js');
const template = require('../templates.js')['user'];
const pageGeneralParameters = require('../libs.js')['page-general-parameters'];
const copyObj = require('../libs.js')['copy-obj'];
const async = require("async");

const obj = Object.create(null);
const dq = copyObj(databaseQueries);

const user = (params, callback) => {
  const queryUsers = dq['queryUsers'];
  const queryMenu = dq['queryMenu'];
  const queryUrl = dq['queryUrl'];
  queryUsers.cbParam[0] = 'url';
  queryUsers.cbParam[1].url = params.url;
  queryUrl.cbParam[1].url = params.url;
  async.series({
    //first request
    dataUsers: cb => {
      database(queryUsers, (err, dataUsers) => {
        if (err) {
          cb(err);
          return;
        }
        cb(null, dataUsers);
      })
    },
    dataMenu: cb => {
      database(queryMenu, (err, dataMenu) => {
        if (err) {
          cb(err);
          return;
        }
        cb(null, dataMenu);
      });
    },
    dataUrl: cb => {
      database(queryUrl, (err, dataUrls) => {
        if (err) {
          cb(err);
          return;
        }
        const dataUrl = dataUrls[0];
        cb(null, dataUrl);
      });
    },

  },
  //final
  (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    try {
      const page = pageGeneralParameters(data.dataUrl, data.dataMenu);
      page['user'] = data.dataUsers[0];
      const html = template(page);
      callback(null, html);
      return;
    } catch (err) {
      //something wrong
      callback(err);
      return;
    }
  });
};

module.exports = user;
