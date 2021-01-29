'use strict';

const string = obj => {
  const { res, controller } = obj;
  const writeHead = [
    301,
    { 'Location': `${controller}` },
  ];
  res.writeHead(...writeHead);
  res.end('redirect 301');
};

module.exports = string;
