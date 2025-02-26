import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path, { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';
import UnoCss from 'unocss/vite';
import svgr from 'vite-plugin-svgr';

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log('🚀 ~ env:', env);
  return {
    base: env.VITE_APP_PUBLIC_PATH,
    // 兼容 Cli
    define: {
      'process.env.VUE_APP_PUBLIC_PATH': JSON.stringify(env.VITE_APP_PUBLIC_PATH),
    },
    plugins: [
      legacy({
        targets: ['defaults', 'not IE 11', 'Chrome 63', 'Firefox > 20'],
        modernPolyfills: true,
      }),
      vue(),
      vueJsx(),
      UnoCss(),
      svgr(),
    ],
    build: {
      base: env.VITE_APP_PUBLIC_PATH,
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          subpage: resolve(__dirname, 'pages/index.html'),
        },
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            antdv: ['ant-design-vue', '@ant-design/icons-vue'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
        vue: 'vue/dist/vue.esm-bundler.js',
        dayjs: resolve(__dirname, 'node_modules', 'dayjs'),
        'ant-design-vue': resolve(__dirname, 'node_modules', 'ant-design-vue'),
      },
    },
    optimizeDeps: {
      include: [
        'ant-design-vue/es/locale/en_US',
        'ant-design-vue/es/locale/zh_CN',
        'store/plugins/expire',
        'ant-design-vue/es/form',
        'dayjs',
        'dayjs/locale/en',
        'dayjs/locale/zh-cn',
        '@ant-design/icons-vue',
        'lodash-es',
        'pinia',
        'vue-router',
        'vue',
        'vue-i18n',
        '@vueuse/core',
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: 'true; @import "~/styles/variables.less";',
          },
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true,
        },
      },
    },
    server: {
      proxy: {
        '/gw/ram-service': {
          target: 'https://db.cadmem.com',
          changeOrigin: true,
        },
      },
    },
  };
};
