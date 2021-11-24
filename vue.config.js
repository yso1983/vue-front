module.exports = {
  runtimeCompiler: true,
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
      }
    },
    //proxy: 'http://yso1983.gq',
    disableHostCheck: true
  }
}
