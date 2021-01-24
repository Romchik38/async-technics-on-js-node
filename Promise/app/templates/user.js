'use strict';

const headTemplate = require('./heads/head.js');
const headerTemplate = require('./headers/header.js');
const footerTemplate = require('./footers/footer.js');

const templateMain = parameters => {
  const head = headTemplate(parameters);
  const header = headerTemplate(parameters);
  const footer = footerTemplate(parameters);
  const user = parameters.user;
  let data = `
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <img src="${user.photo}" class="card-img-top" alt="Фото ${user.name}">
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title">${user.name} ${user.lastname}</h1>
              <h4 class="card-subtitle text-muted">${user.role}</h4>
              <p class="card-text" style="font-size:1.5rem">${user.shortdescription}</p>
            </div>
          </div>
        </div>
      </div class="row">
    </div>
    ${footer}
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = templateMain;
