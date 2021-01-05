'use strict';

const forward = list => {
  list.forward = function(elem, res) {
    elem = elem || this.first;
    if (!elem) return;
    const data = elem.data;
    const fn = data.shift();
    const callback = data.pop();
    const args = res || data;
    fn(...args, (err, data) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, data);
      if (elem.next) this.forward(elem.next);
    });
  };
  return list;
};

module.exports = forward;
