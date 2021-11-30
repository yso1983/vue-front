module.exports = {
  runtimeCompiler: true,
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    //host: 'yso1983',
    proxy: {
      '/api': {
        //target: 'http://localhost:3000/api',
        target: 'http://yso1983.gq/api',
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
