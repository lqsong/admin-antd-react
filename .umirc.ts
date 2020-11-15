// https://umijs.org/config/
import { defineConfig } from 'umi';

import fs from 'fs';
import path from 'path';
import lessToJs from 'less-vars-to-js';

import { routes } from './src/config/routes';

const { API_HOST } = process.env;

export default defineConfig({
  define: {
    API_HOST: API_HOST,
  },
  history: { type: 'hash' },
  hash: true,
  ignoreMomentLocale: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: lessToJs(
    fs.readFileSync(
      path.join(__dirname, './src/assets/css/antd-variables.less'),
      'utf8',
    ),
  ),
  title: false,
  proxy: {},
  chainWebpack(memo /* ,  { webpack } */) {
    // 内置的 svg Rule 添加 exclude
    memo.module
      .rule('svg')
      .exclude.add(/iconsvg/)
      .end();

    // 添加 svg-sprite-loader Rule
    memo.module
      .rule('svg-sprite-loader')
      .test(/.svg$/)
      .include.add(/iconsvg/)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader');

    // 添加 svgo Rule
    memo.module
      .rule('svgo')
      .test(/.svg$/)
      .include.add(/iconsvg/)
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        // externalConfig 配置特殊不是相对路径，起始路径是根目录
        externalConfig: './src/assets/iconsvg/svgo.yml',
      });

    /*
    // 添加 svgr Rule (yarn add @svgr/webpack --dev) (移除)
    memo.module
      .rule('svgr')
      .test(/.svg$/)
      .include.add(/iconsvg/).end()
      .use('@svgr/webpack')
      .loader(require.resolve('@svgr/webpack'));
    */
  },
});
