'use strict';

const headTemplate = require('./heads/head.js');
const headerTemplate = require('./headers/header.js');
const footerTemplate = require('./footers/footer.js');

const templateMain = parameters => {
  const head = headTemplate(parameters);
  const header = headerTemplate(parameters);
  const footer = footerTemplate(parameters);
  const data = `
    <div class="jumbotron">
      <h1 class="display-4">Main Page</h1>
      <p class="lead">On this site you can work with user profiles.</p>
      <hr class="my-4">
      <p>Visit Users page to find or update imformation.</p>
      <p>Have a nice day!</p>
    </div>
    ${footer}
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = templateMain;
