module.exports = {
  runtimeCompiler: true,
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    //proxy: 'http://yso1983.gq',
    proxy: 'http://localhost:3000',
    disableHostCheck: true
  }
}
