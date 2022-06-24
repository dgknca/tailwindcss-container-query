const cssMatcher = require('jest-matcher-css')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const defaultOptions = {
  corePlugins: { preflight: false },
  plugins:  [require('../src')],
}

function run(input, config, plugin = tailwindcss) {
  return postcss(
    plugin(config)
  )
  .process(input, {
    from: undefined
  })
}

expect.extend({
  toMatchCss: cssMatcher
})

it('should add the container query at-rule for `.cq-w-22` class and its contents', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="cq-w-22:bg-yellow-200"></div>` }],
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      @container (min-width: 352px) {
        .cq-w-22\:bg-yellow-200 {
          --tw-bg-opacity: 1;
          background-color: rgb(254 240 138 / var(--tw-bg-opacity));
        }
      }
    `)
  })
})

it('should add the container query at-rule for `.cq-h-22` class and its contents', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="cq-h-22:bg-yellow-200"></div>` }],
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      @container (min-height: 352px) {
        .cq-h-22\:bg-yellow-200 {
          --tw-bg-opacity: 1;
          background-color: rgb(254 240 138 / var(--tw-bg-opacity));
        }
      }
    `)
  })
})

it('should match the arbitrary values', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="cq-h-[450px]:bg-yellow-200 cq-w-[238px]:bg-yellow-200"></div>` }],
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      @container (min-height: 450px) {
        .cq-h-\[450px\]\:bg-yellow-200 {
          --tw-bg-opacity: 1;
          background-color: rgb(254 240 138 / var(--tw-bg-opacity));
        }
      }
      @container (min-width: 238px) {
        .cq-w-\[238px\]\:bg-yellow-200 {
          --tw-bg-opacity: 1;
          background-color: rgb(254 240 138 / var(--tw-bg-opacity));
        }
      }
    `)
  })
})

it('should add the `container-type-size` class', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="container-type-size"></div>` }],
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .container-type-size {
        container-type: size;
      }
    `)
  })
})

it('should add the `container-type-inline-size` class', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="container-type-inline-size"></div>` }],
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .container-type-inline-size {
        container-type: inline-size;
      }
    `)
  })
})

it('should add the `container-type-block-size` class', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="container-type-block-size"></div>` }],
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .container-type-block-size {
        container-type: block-size;
      }
    `)
  })
})

it('should add the `container-type-style` class', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="container-type-style"></div>` }],
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .container-type-style {
        container-type: style;
      }
    `)
  })
})

it('should add the `container-type-state` class', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="container-type-state"></div>` }],
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .container-type-state {
        container-type: state;
      }
    `)
  })
})

it('should create the `container-name-sidebar` class', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="container-name-sidebar"></div>` }],
    theme: {
      containerName: {
        sidebar: 'sidebar'
      }
    },
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .container-name-sidebar {
        container-name: sidebar;
      }
    `)
  })
})

it('should create a named container query at-rule', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="cq-w-sd-22:bg-yellow-200"></div>` }],
    theme: {
      containerName: {
        sd: 'sidebar'
      }
    },
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      @container sidebar (min-width: 352px) {
        .cq-w-sd-22\:bg-yellow-200 {
          --tw-bg-opacity: 1;
          background-color: rgb(254 240 138 / var(--tw-bg-opacity));
        }
      }
    `)
  })
})