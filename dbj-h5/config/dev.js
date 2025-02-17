const { TARO_APP_API_HOST } = process.env

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  h5: {
    esnextModules: ['taro-ui'],
    devServer: {
      open: false,
      proxy: {
        '/gw': {
          target: TARO_APP_API_HOST,
          secure: false,
          changeOrigin: true,
        },
      },
    },
  }
}
