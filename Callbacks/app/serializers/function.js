'use strict';

const func = obj => {
  const { req, res, controller } = obj;
  //something on start;
  const params = { url: req.url };
  //start controller
  controller(params, (err, data) => {
    if (err) {
      console.log('error from controller -', err);
      //then message a client
      const statusCode = err.statusCode;
      const writeHead = [statusCode];
      const message = `ops, error ${statusCode}, url:`
        .concat(req.url)
        .concat('please contact admin@site.com')
        .concat(`\nerror message:${err.messageClient}`);
      res.writeHead(...writeHead);
      res.end(message);
      return;
    }
    //something on end;
    const writeHead = [200];
    res.writeHead(...writeHead);
    res.end(data);
  });
};


module.exports = func;
