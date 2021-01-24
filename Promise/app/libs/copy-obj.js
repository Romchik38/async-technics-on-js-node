'use strict';

const vm = require('vm');

const serialize = obj => {
  const type = typeof obj;
  const fn = serializer[type];
  return fn(obj);
};

const makeSymbol = s => {
  let symbol = s.toString();
  symbol = symbol.replace(/\(/g, '(\'');
  symbol = symbol.replace(/\)/g, '\')');
  return '[' + symbol + ']:';
};

const serializer = {
  string: s => `'${s}'`,
  number: n => n.toString(),
  boolean: b => b.toString(),
  function: f => f.toString(),
  object: o => {
    if (Array.isArray(o)) {
      let strArr = '[';
      for (const item of o) {
        if (strArr.length > 1) strArr += ',';
        strArr += serialize(item);
      }
      return strArr + ']';
    }
    if (o === null) return null;
    let s = '{';
    for (const key in o) {
      const value = o[key];
      if (s.length > 1) s += ',';
      s += key + ':' + serialize(value);
    }
    const symbols = Object.getOwnPropertySymbols(o);
    for (const symbol of symbols) {
      const value = o[symbol];
      if (s.length > 1) s += ',';
      s += makeSymbol(symbol) + serialize(value);
    }
    return s + '}';
  },
};

const copyObj = obj => {
  const str = serialize(obj);
  const script = vm.createScript('(' + str + ')');
  return script.runInThisContext();
};

module.exports = copyObj;
