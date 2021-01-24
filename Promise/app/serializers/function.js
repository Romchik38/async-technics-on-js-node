'use strict';

const func = obj => {
  const { req, res, controller } = obj;
  //something on start;
  const params = { url: req.url };
  //start controller
  controller(params)
    .then(data => {
      const writeHead = [200];
      res.writeHead(...writeHead);
      res.end(data);
    }).catch(err => {
      console.log('error from controller -', err);
      //then message a client
      const statusCode = err.statusCode || 500;
      err.messageClient = err.messageClient || 'can\'t display this page';
      const writeHead = [statusCode];
      const message = `ops, error ${statusCode}, url:`
        .concat(req.url)
        .concat('please contact admin@site.com')
        .concat(`\nerror message: ${err.messageClient}`);
      res.writeHead(...writeHead);
      console.log('------------------------');
      res.end(message);
      return;
    });
};


module.exports = func;
