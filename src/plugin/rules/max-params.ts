import type { Rule } from 'eslint'
import utils from '@eslint-community/eslint-utils'

export const maxParams: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    dialects: ['typescript', 'javascript'],
    language: 'javascript',

    docs: {
      description: 'Enforce a maximum number of parameters in function definitions',
    },

    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      exceed: '{{name}} has too many parameters ({{count}}). Maximum allowed is {{max}}.',
    },
  },

  create(context) {
    const options = Object.assign({
      max: 3,
    }, context.options[0])

    function checkFunction(node: any) {
      const isConstructor = node.parent?.type === 'MethodDefinition' && node.parent.kind === 'constructor'
      const thisParam = node.params.length > 0 &&
        node.params[0].type === 'Identifier' &&
        node.params[0].name === 'this'
        ? node.params[0]
        : null

      const count = node.params.length - (thisParam ? 1 : 0)

      if (count > options.max && !isConstructor) {
        const name = utils.getFunctionNameWithKind(node)
        context.report({
          loc: utils.getFunctionHeadLocation(node, context.sourceCode)!,
          node,
          messageId: 'exceed',
          data: {
            name: name.substring(0, 1).toUpperCase() + name.substring(1),
            count: String(count),
            max: String(options.max),
          },
        })
      }
    }

    return {
      FunctionDeclaration: checkFunction,
      ArrowFunctionExpression: checkFunction,
      FunctionExpression: checkFunction,
      TSDeclareFunction: checkFunction,
      TSFunctionType: checkFunction,
    }
  },
}
