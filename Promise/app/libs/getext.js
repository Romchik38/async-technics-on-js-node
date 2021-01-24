'use strict';

const path = require('path');

const getExt = url => path.parse(url)['ext'];

module.exports = getExt;
