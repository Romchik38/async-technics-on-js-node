'use strict';

//const count = 300;    //setTimeout will start every 300 items
let counter = 0;

const nonBlockCbFn =  (arr, callback, query, count = 200) => {
  const filter = (arr, arr2 = []) => {
    counter += 1;
    const numb = arr.shift();
    const res = query(numb);
    if (res) arr2.push(numb);
    if (arr.length === 0) {
      callback(null, arr2);
      return;
    } else if (counter === count) {
      counter = 0;
      setTimeout(() => {
        filter(arr, arr2);
      }, 0);
    } else {
      filter(arr, arr2);
    }
  };
  filter(arr);
};

module.exports = nonBlockCbFn;
