'use strict';

const headTemplate = require('./heads/head.js');
const headerTemplate = require('./headers/header.js');
const footerTemplate = require('./footers/footer.js');

const templateMain = parameters => {
  const head = headTemplate(parameters);
  const header = headerTemplate(parameters);
  const footer = footerTemplate(parameters);
  const users = parameters.users;
  let data = `
    <div class="container">`;
      while (users.length > 0) {
        data += '<div class="row">';
        for (let i = 0; i < 3; i++) {
          if (users.length) {
            const user = users.shift();
              data +=
              `<div class="col-sm">
                <div class="row">
                  <div class="card" style="width: 18rem;">
                    <a href="${user.url}">
                      <img class="card-img-top" src="${user.photo}" alt="Card image cap">
                    </a>
                    <div class="card-body">
                    <h5 class="card-title">${user.name + ' ' + user.lastname}</h5>
                    <p class="card-text">${user.shortdescription}</p>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Login: ${user.login}</li>
                      <li class="list-group-item">Role: ${user.role}</li>
                    </ul>
                    <div class="card-body">
                      <a href="#" class="card-link">more details</a>
                    </div>
                    </div>
                  </div>
                </div>
              </div>`;
          }
        }
        data += '</div>';
      }
      data += `
    </div>
    ${footer}
  `;
  const html = head.concat(header).concat(data);
  return html;
};

module.exports = templateMain;
