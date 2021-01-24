'use strict';

const databaseQueries = {
  queryUsers: { table: 'users', operation: 'select',
    cbParam: ['all', {}] },
  queryUrl: { table: 'pages', operation: 'select',
    cbParam: ['url', {}] },
  queryMenu: { table: 'pages', operation: 'select',
    cbParam: ['urls-menu', {}] },
};

module.exports = databaseQueries;
