const { defineConfig } = require('@vue/cli-service')
const clickToVueComponent = require('click-to-vue-component')
module.exports = defineConfig({
  chainWebpack: (config) => {
    clickToVueComponent(config)
  },
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false
    }
  }
})
