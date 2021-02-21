'use strict';

const url = function(item) {
  const url = item.url;
  if (url === this.url) {
    return item;
  } else return null;
};

module.exports = url;
