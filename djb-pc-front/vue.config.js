const path = require('path');
// const webpack = require('webpack');
const { IgnorePlugin } = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const { createMockMiddleware } = require('umi-mock-middleware');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const StyleLintPlugin = require('stylelint-webpack-plugin');
const { existsSync } = require('fs');
const UnoCSS = require('@unocss/webpack').default;
const clickToVueComponent = require('click-to-vue-component')
// const isProd = process.env.NODE_ENV === 'production'
// const isUseCDN = process.env.IS_USE_CDN === 'true';
const isAnalyz = process.env.IS_ANALYZ === 'true';

function resolve(dir) {
  return path.join(__dirname, dir);
}
let isTs = true;
if (existsSync(resolve('./src/main.js'))) {
  isTs = false;
}
module.exports = {
  chainWebpack: (config) => {
    clickToVueComponent(config)
  },
  outputDir: 'dist/web',
  pages: {
    index: {
      // page 的入口
      entry: isTs ? 'src/main.ts' : 'src/main.js',
    },
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: {
    plugins: [
      UnoCSS(),
      new ModuleFederationPlugin({
        shared: ['vue', 'vuex', 'vue-router', 'ant-design-vue', 'vxe-table'],
      }),
    ],
    optimization: {
      realContentHash: true,
    },
  },
  chainWebpack: config => {
    // 移除 prefetch preload 插件
    config.plugins.delete('prefetch-app');
    config.plugins.delete('preload-app');
    config.resolve.alias.set('@', resolve('./src'));
    config.resolve.alias.set('~', resolve('./src/assets'));
    config.resolve.alias.set('vue$', resolve('./node_modules/vue/dist/vue.esm-bundler.js'));
    config.module.rule('markdown').test(/\.md$/).use('raw-loader').loader('raw-loader').end();
    // if `IS_ANALYZ` env is TRUE on report bundle info
    isAnalyz &&
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
        },
      ]);
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: 'true; @import "~/styles/variables.less";',
          },
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    client: {
      overlay: false,
    },
    port: 8000,
    // mock serve
    // onBeforeSetupMiddleware: ({ app }) => {
    //   if (process.env.HTTP_MOCK === 'true') {
    //     app.use(createMockMiddleware());
    //   }
    // },
    // If you want to turn on the proxy, please remove the `before` in `devServer`
    proxy: {
      '/': {
        // backend url
        target: 'https://db.cadmem.com',
        ws: false,
        changeOrigin: true,
      },
    },
  },
  /* ADVANCED SETTINGS */

  // disable source map in production
  productionSourceMap: false,
  // ESLint Check: DISABLE for false
  // Type: boolean | 'warning' | 'default' | 'error'
  lintOnSave: 'warning',
  // babel-loader no-ignore node_modules/*
  transpileDependencies: true,
};
