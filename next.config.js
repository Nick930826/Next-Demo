const withCss = require('@zeit/next-css')
const withLessExcludeAntd = require('./next-less.config.js')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const path = require('path')

if (typeof require !== undefined) {
  require.extensions['.less'] = file => {}
}

// 默认抛出一个config配置，通过withCss包裹之后，配置默认加上可以引入css的属性
module.exports = withCss(withLessExcludeAntd({
  /* config options here */
  distDir: './dist',
  cssModules: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
    camelCase: true
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: {
      'border-radius-base': '0',
      'border-radius-sm': '0'
    }
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
      })
    )
    Object.assign(config.resolve.alias, {
      components: path.resolve(__dirname, './components'),
      pages: path.resolve(__dirname, './pages')
    })
    return config
  }
}))