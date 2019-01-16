'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iskebabCase = iskebabCase;
exports.kebabCase = kebabCase;
exports.camelCase = camelCase;
function iskebabCase(str) {
  return str.indexOf('-');
}

function kebabCase(str) {
  return str.replace(/[- _]+|([A-Z])/g, function (whole, sub) {
    return sub ? '-' + sub.toLowerCase() : '-';
  }).replace(/^-/, '').replace(/-+/g, '-');
}

function camelCase(str) {
  return kebabCase(str).replace(/-([a-z])/g, function (whole, ch) {
    return ch.toUpperCase();
  }).replace(/[A-Z]([a-z])([A-Z]|\b)/g, function (whole, ch) {
    return whole.toUpperCase();
  });
}