'use strict';

const path = require('path');

const delExt = (acc, val) => {
  const name = path.parse(val)['name'];
  const ext = path.parse(val)['ext'];
  if (ext) {
    acc.push(name);
  }
  return acc;
};

module.exports = delExt;
