'use strict';

const urlsMenu = function(elem) {
  const menu = elem.menu;
  if (menu) {
    return {
      name: elem.name,
      url: elem.url
    };
  }
};

module.exports = urlsMenu;
