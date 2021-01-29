'use strict';

const pageGeneralParameters = (page, menu) => {
  const pageParam  =  Object.create(null);
  pageParam['title'] = page.title;
  pageParam['url'] = page.url;
  pageParam['menu'] = menu;
  return pageParam;
};

module.exports = pageGeneralParameters;
