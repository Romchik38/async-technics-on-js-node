'use strict';

const func = async obj => {
  const { req, res, controller } = obj;
  try {
    const params = { url: req.url };
    const data = await controller(params)
    const writeHead = [200];
    res.writeHead(...writeHead);
    res.end(data);
  } catch (err) {
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
    res.end(message);
  };
};


module.exports = func;
