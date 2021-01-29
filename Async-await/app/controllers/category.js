'use strict';

const template = require('../templates.js')['category'];
const pageGeneralParameters = require('../libs.js')['page-general-parameters'];

const readJson = require('../libs.js')['readJson'];
const dtbase = require('../../node_modules/@romchik38/dtbase');
const dtbaseFnUrl = require('../dtbaseFns/url.js');
const dtbaseFnUrlsMenu = require('../dtbaseFns/urlsMenu.js');
const dtbaseFnAll = require('../dtbaseFns/all.js');

const category = async params => {
  try {
    //1
    const pages = await readJson('pages');
    const users = await readJson('users');
    const dataPage = (await dtbase({
      methodName: 'select',
      fn: dtbaseFnUrl.bind({ url: params.url }),
      source: pages,
    }))[0];
    //2
    const dataMenu = await dtbase({
      methodName: 'select',
      fn: dtbaseFnUrlsMenu,
      source: pages,
    });
    //3
    const dataUsers = await dtbase({
      methodName: 'select',
      fn: dtbaseFnAll,
      source: users,
    });
    //final
    const page = pageGeneralParameters(dataPage, dataMenu);
    page['users'] = dataUsers;  //отличие от main, передаем пользователей
    const html = template(page);
    return html;
  } catch (err) {
    throw new Error(err);
  };
};

module.exports = category;
