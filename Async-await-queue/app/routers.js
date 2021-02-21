'use strict';

const fs = require('fs');
const controllers = require('./controllers');

const routers = Object.create(null);
const DIR_PATH = __dirname + '/routers/';
const F_PATH = DIR_PATH + 'functions.json';
const R_PATH = DIR_PATH + 'redirects.json';

const load = path => JSON.parse(fs.readFileSync(path))[0];

const urlFunctions = load(F_PATH);
const urlRedirects = load(R_PATH);

{
  const keys = Object.keys(urlFunctions);
  for (const key of keys) {
    routers[key] = controllers[urlFunctions[key]];
  }
}

{
  const keys = Object.keys(urlRedirects);
  for (const key of keys) {
    routers[key] = urlRedirects[key];
  }
}

module.exports = routers;
