'use strict';

const http = require('http');

const serializers = require('./app/serializers');
const routers = require('./app/routers');
const ConcurrentQueue = require('./app/libs/concurrentQueue.js');
const serializeError = require('./app/errors.js');

const job = async (element, callback) => {
  const { task, thenable } = element;
  const { request, serializer, controller } = task;
  const result = await serializer({ request, controller });
  if (result instanceof Error) {
    callback(result, { thenable });
  } else {
    callback(null, { result, thenable });
  }
};

const q1 = new ConcurrentQueue(500)
  .process(job)
  .wait(4000)
  .timeout(5000)
  .success(data => {
    const { thenable, result } = data;
    thenable.resolve(result);
  })
  .failure((err, data) => {
    const { thenable } = data;
      thenable.reject(err);
  });

const server = http.createServer((req, res) => {
  const controller = routers[req.url];
  const serializer = serializers[typeof controller];
  const request = { url: req.url };
  q1.add({ request, serializer, controller })
    .then(result => {
      const { data, writeHead } = result;
      res.writeHead(...writeHead);
      res.end(data);
    }, err => {
      const serializedError = serializeError(err);
      if (serializedError) {
        const { data, writeHead } = serializedError(request);
        res.writeHead(...writeHead);
        res.end(data);
      } else {
        console.log('This Error must be serialized!', err);
        res.statusCode = 503;
        res.end('error processing data');
      }
    });
});

server.listen(8080, '127.0.0.1');

process.on('SIGINT', () => {
  console.log('\nserver stoped');
  server.close();
});

process.on('unhandledRejection', err => {
  console.log(err);
});
