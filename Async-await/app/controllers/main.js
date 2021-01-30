'use strict';

const template = require('../templates.js')['main'];
const pageGeneralParameters = require('../libs.js')['page-general-parameters'];

const readJson = require('../libs.js')['readJson'];
const dtbase = require("@romchik38/dtbase");
const dtbaseFnUrl = require('../dtbaseFns/url.js');
const dtbaseFnUrlsMenu = require('../dtbaseFns/urlsMenu.js');

const main = async (params) => {
  try {
    //1
    const pages = await readJson('pages');
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
    //final
    const page = pageGeneralParameters(dataPage, dataMenu);
    const html = template(page);
    return html;
  } catch (err) {
    throw new Error(err);
  };
};

module.exports = main;
