'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (babel) {
  var t = babel.types;


  return {
    name: 'global-variable',
    visitor: {
      ImportDeclaration: function ImportDeclaration(path, state) {
        var node = path.node;
        var _state$opts = state.opts,
            whiteList = _state$opts.whiteList,
            namespace = _state$opts.namespace;


        var src = node.source.value;
        var camel = (0, _utils.camelCase)(src);

        if (src === namespace || whiteList && whiteList.includes(src)) {
          if (node.specifiers.length === 1 && (node.specifiers[0].type === 'ImportDefaultSpecifier' || node.specifiers[0].type === 'ImportNamespaceSpecifier')) {
            var identifier = node.specifiers[0].local.name;
            path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(identifier), t.memberExpression(t.identifier(GLOBAL), t.identifier([namespace, camel].join('.'))))]));
          } else if (node.specifiers) {
            node.specifiers.forEach(function (_ref) {
              var type = _ref.type,
                  imported = _ref.imported,
                  local = _ref.local;

              if (type === 'ImportDefaultSpecifier') {
                path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(local.name), t.memberExpression(t.identifier(GLOBAL), t.identifier([namespace, camel].join('.'))))]));
                path.getSibling(path.key - 1).stop();
              } else if (imported.name === 'default') {
                path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(local.name), t.memberExpression(t.identifier(GLOBAL), t.identifier([namespace, camel].join('.'))))]));
                path.getSibling(path.key - 1).stop();
              } else if (src === namespace) {
                path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(local.name), t.memberExpression(t.identifier(GLOBAL), t.identifier([namespace, imported.name].join('.'))))]));
                path.getSibling(path.key - 1).stop();
              } else {
                path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(local.name), t.memberExpression(t.identifier(GLOBAL), t.identifier([namespace, camel, imported.name].join('.'))))]));
                path.getSibling(path.key - 1).stop();
              }
            });
          }
          path.remove();
        }
      }
    }
  };
};

var _utils = require('./utils');

var GLOBAL = 'window';

module.exports = exports['default'];