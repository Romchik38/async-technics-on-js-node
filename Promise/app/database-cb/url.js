'use strict';

const url = function(elem) {
  const url = elem.url;
  if (url === this.url) {
    return elem;
  }
};

module.exports = url;
