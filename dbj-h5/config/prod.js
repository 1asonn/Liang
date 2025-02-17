const { TARO_APP_PUBLIC_PATH } = process.env

const CDN_PATH = 'customer-overseas-dbj/'

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  h5: {
    esnextModules: ['taro-ui'],
    publicPath: TARO_APP_PUBLIC_PATH,
    output: {
      filename: CDN_PATH + "js/[name].[contenthash:8].js",
      chunkFilename: CDN_PATH + "js/[name].[chunkhash:8].js",
    },
    miniCssExtractPluginOption: {
      filename: CDN_PATH + "css/[name].[contenthash:8].css",
      chunkFilename: CDN_PATH + "css/[name].[chunkhash:8].css",
    },
    imageUrlLoaderOption: {
      limit: 5000,
      name: CDN_PATH + "assets/[name].[contenthash:8].[ext]",
    },
    mediaUrlLoaderOption: {
      name: CDN_PATH + "assets/[name].[contenthash:8].[ext]",
    },
    fontUrlLoaderOption: {
      name: CDN_PATH + "assets/[name].[contenthash:8].[ext]",
    },
  }
}
