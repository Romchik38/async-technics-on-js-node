'use strict';

 const database = require('../database.js');
// const databaseQueries = require('../database-queries.js');
// const template = require('../templates.js')['category'];
// const pageGeneralParameters = require('../libs.js')['page-general-parameters'];
// const List = require('../libs.js')['list'];
// const forward =  require('../libs.js')['forward'];

const obj = Object.create(null);
const lastFn = callback => {
  try {
    // const page = pageGeneralParameters(obj.dataUrls, obj.dataMenu);
    // page['users'] = obj.dataUsers;
    // const html = template(page);
    // callback(null, html);
    return;
  } catch (err) {
    //something wrong
    // callback(err);
  }
};

const user = (params, callback) => {
  // const queryUsers = databaseQueries['queryUsers'];
  // const queryMenu = databaseQueries['queryMenu'];
  // const queryUrl = databaseQueries['queryUrl'];
  // queryUrl.cbParam[1].url = params.url;
  // const list = new List();
  // forward(list);
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

};

module.exports = user;
