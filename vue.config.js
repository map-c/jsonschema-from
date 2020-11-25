const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoEditorWebpackPlugin())
  },
}
