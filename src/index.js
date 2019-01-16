import { camelCase } from './utils'

const GLOBAL = 'window'

export default function(babel) {
  const { types: t } = babel

  return {
    name: 'global-variable',
    visitor: {
      ImportDeclaration(path, state) {
        let { node } = path
        const { whiteList, namespace } = state.opts

        let src = node.source.value
        let camel = camelCase(src)

        if (src === namespace || (whiteList && whiteList.includes(src))) {
          if (
            node.specifiers.length === 1 &&
            (node.specifiers[0].type === 'ImportDefaultSpecifier' ||
              node.specifiers[0].type === 'ImportNamespaceSpecifier')
          ) {
            let identifier = node.specifiers[0].local.name
            path.insertBefore(
              t.variableDeclaration('const', [
                t.variableDeclarator(
                  t.identifier(identifier),
                  t.memberExpression(t.identifier(GLOBAL), t.identifier([namespace, camel].join('.')))
                )
              ])
            )
          } else if (node.specifiers) {
            node.specifiers.forEach(({ type, imported, local }) => {
              if (type === 'ImportDefaultSpecifier') {
                path.insertBefore(
                  t.variableDeclaration('const', [
                    t.variableDeclarator(
                      t.identifier(local.name),
                      t.memberExpression(t.identifier(GLOBAL), t.identifier([namespace, camel].join('.')))
                    )
                  ])
                )
                path.getSibling(path.key - 1).stop()
              } else if (imported.name === 'default') {
                path.insertBefore(
                  t.variableDeclaration('const', [
                    t.variableDeclarator(
                      t.identifier(local.name),
                      t.memberExpression(t.identifier(GLOBAL), t.identifier([namespace, camel].join('.')))
                    )
                  ])
                )
                path.getSibling(path.key - 1).stop()
              } else if (src === namespace) {
                path.insertBefore(
                  t.variableDeclaration('const', [
                    t.variableDeclarator(
                      t.identifier(local.name),
                      t.memberExpression(t.identifier(GLOBAL), t.identifier([namespace, imported.name].join('.')))
                    )
                  ])
                )
                path.getSibling(path.key - 1).stop()
              } else {
                path.insertBefore(
                  t.variableDeclaration('const', [
                    t.variableDeclarator(
                      t.identifier(local.name),
                      t.memberExpression(
                        t.identifier(GLOBAL),
                        t.identifier([namespace, camel, imported.name].join('.'))
                      )
                    )
                  ])
                )
                path.getSibling(path.key - 1).stop()
              }
            })
          }
          path.remove()
        }
      }
    }
  }
}
