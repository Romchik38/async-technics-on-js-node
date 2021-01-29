'use strict';

const http = require('http');

const serializers = require('./app/serializers');
const routers = require('./app/routers');

const server = http.createServer((req, res) => {
  const controller = routers[req.url];
  const serializer = serializers[typeof controller];
  serializer({ req, res, controller });
});

server.listen(8080, '127.0.0.1');

server.on('error', err => {
  console.log(err);
});
