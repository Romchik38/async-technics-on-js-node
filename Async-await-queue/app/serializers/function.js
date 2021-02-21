'use strict';

const func = async obj => {
  const { request, controller } = obj;
  try {
    const params = { url: request.url };
    const data = await controller(params)
    const writeHead = [200];
    return { data, writeHead };
  } catch (err) {
    return err;
  };
};


module.exports = func;
