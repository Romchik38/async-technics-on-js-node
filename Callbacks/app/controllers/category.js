'use strict';

const database = require('../database.js');
const databaseQueries = require('../database-queries.js');
const template = require('../templates.js')['category'];
const pageGeneralParameters = require('../libs.js')['page-general-parameters'];
const List = require('../libs.js')['list'];
const forward =  require('../libs.js')['forward'];
const copyObj = require('../libs.js')['copy-obj'];

const obj = Object.create(null);
const dq = copyObj(databaseQueries);
const lastFn = callback => {
  try {
    const page = pageGeneralParameters(obj.dataUrls, obj.dataMenu);
    page['users'] = obj.dataUsers;
    const html = template(page);
    callback(null, html);
    return;
  } catch (err) {
    //something wrong
    callback(err);
  }
};

const category = (params, callback) => {
  const queryUsers = dq['queryUsers'];
  const queryMenu = dq['queryMenu'];
  const queryUrl = dq['queryUrl'];
  queryUrl.cbParam[1].url = params.url;
  const list = new List();
  forward(list);
  //first request
  list.push(database, queryUsers, (err, dataUsers) => {
    if (err) {
      callback(err);
      return;
    }
    obj.dataUsers = dataUsers;
  });
  //second
  list.push(database, queryMenu, (err, dataMenu) => {
    if (err) {
      callback(err);
      return;
    }
    obj.dataMenu = dataMenu;
  });
  list.push(database, queryUrl, (err, dataUrls) => {
    if (err) {
      callback(err);
      return;
    }
    obj.dataUrls = dataUrls[0];
  });
  //last request
  list.push(lastFn, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
  //start
  list.forward();
};

module.exports = category;
