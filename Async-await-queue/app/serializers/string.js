'use strict';

const string = async obj => {
  const { controller } = obj;
  const writeHead = [
    301,
    { 'Location': `${controller}` },
  ];
  const data = 'redirect 301';
  return { data, writeHead };
};

module.exports = string;
