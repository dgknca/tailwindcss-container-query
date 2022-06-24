const plugin = require('tailwindcss/plugin')

const containerQuery = plugin(
  function ({ addUtilities, addVariant, matchVariant, theme, variants, e, postcss }) {
    const containerType = theme('containerType')
    const containerQuery = theme('containerQuery')
    const containerName = theme('containerName')

    addUtilities(
      [
        Object.entries(containerType).map(([key, value]) => {
          return {
            [`.${e(`container-type-${key}`)}`]: {
              'container-type': `${value}`,
            },
          }
        })
      ],
      variants('containerType')
    )

    addUtilities(
      [
        Object.entries(containerName).map(([key, value]) => {
          return {
            [`.${e(`container-name-${key}`)}`]: {
              'container-name': `${value}`,
            },
          }
        })
      ],
      variants('containerName')
    )

    matchVariant({
      'cq-h': (queryValue) => `@container (min-height: ${queryValue})`,
    })
    matchVariant({
      'cq-w': (queryValue) => `@container (min-width: ${queryValue})`,
    })

    Object.entries(containerQuery).map(([key, value]) => {
      return addVariant(`cq-w-${key}`, ({ container, separator }) => {
        const cqRule = postcss.atRule({ name: 'container', params: `(min-width: ${value})` })
        cqRule.append(container.nodes)
        container.append(cqRule)
        cqRule.walkRules(rule => {
          rule.selector = `.${e(`cq-w-${key}${separator}`)}${rule.selector.slice(1)}`
        })
      })
    })

    Object.entries(containerQuery).map(([queryName, queryValue]) => {
      return Object.entries(containerName).map(([nameKey, nameValue]) => {
        return addVariant(`cq-w-${nameKey}-${queryName}`, ({ container, separator }) => {
          const cqRule = postcss.atRule({ name: 'container', params: `${nameValue} (min-width: ${queryValue})` })
          cqRule.append(container.nodes)
          container.append(cqRule)
          cqRule.walkRules(rule => {
            rule.selector = `.${e(`cq-w-${nameKey}-${queryName}${separator}`)}${rule.selector.slice(1)}`
          })
        })
      })
    })

    Object.entries(containerQuery).map(([key, value]) => {
      return addVariant(`cq-h-${key}`, ({ container, separator }) => {
        const cqRule = postcss.atRule({ name: 'container', params: `(min-height: ${value})` })
        cqRule.append(container.nodes)
        container.append(cqRule)
        cqRule.walkRules(rule => {
          rule.selector = `.${e(`cq-h-${key}${separator}`)}${rule.selector.slice(1)}`
        })
      })
    })

    Object.entries(containerQuery).map(([queryName, queryValue]) => {
      return Object.entries(containerName).map(([nameKey, nameValue]) => {
        return addVariant(`cq-h-${nameKey}-${queryName}`, ({ container, separator }) => {
          const cqRule = postcss.atRule({ name: 'container', params: `${nameValue} (min-height: ${queryValue})` })
          cqRule.append(container.nodes)
          container.append(cqRule)
          cqRule.walkRules(rule => {
            rule.selector = `.${e(`cq-h-${nameKey}-${queryName}${separator}`)}${rule.selector.slice(1)}`
          })
        })
      })
    })
  },
  {
    experimental: { matchVariant: true },
    theme: {
      containerQuery: {
        4: '64px',
        6: '96px',
        9: '144px',
        16: '256px',
        22: '352px',
      },
      containerType: {
        size: 'size',
        'inline-size': 'inline-size',
        'block-size': 'block-size',
        style: 'style',
        state: 'state',
      },
      containerName: {}
    },
  }
)

module.exports = containerQuery