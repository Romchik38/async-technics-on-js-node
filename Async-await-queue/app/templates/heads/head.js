'use strict';

const templateHead = parameters => {
  const { title } = parameters;
  const data = `
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${title}</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
      <link rel="icon" href="/favicon.ico" type="image/x-icon">
      <link rel="stylesheet" href="/css/bootstrap.min.css">
    </head>
  `;
  return data;
};

module.exports = templateHead;