'use strict';

const errors = ['file not found', 'ENOENT: no such file or directory',
  'Process timeout', 'Waiting timed out'];

const errorsHash = {
  'file not found': request => ({
    data: `file ${request.url} was not found on this server`,
    writeHead: [404]
  }),
  'ENOENT: no such file or directory': request => ({
    data: `Page: ${request.url}\nLooks like there are some problems with data on the server`,
    writeHead: [503]
  }),
  'Process timeout': request => ({
    data: `Process time is ended on page ${request.url}. Try again later`,
    writeHead: [500]
  }),
  'Waiting timed out': request => ({
    data: `Too many requests (Waiting timed out) page ${request.url}. Try again later`,
    writeHead: [500]
  })
};

const serializeError = err => {
  const filtered = errors.filter(element => {
    const result = err.message.indexOf(element);
    if (result > -1) return true;
  });
  if (filtered.length) {
    const fn = errorsHash[filtered[0]];
    return fn;
  }
};

module.exports = serializeError;
