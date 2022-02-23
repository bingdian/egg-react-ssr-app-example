'use strict';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const buildEnvConfig = require('./build.env.config');
const getAbsolutePath = relativePath => path.resolve(__dirname, relativePath);
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === 'production';
const isAnalyzer = process.env.ANALYZER === 'true';

module.exports = isNodeEnv => {
  return {
    target: isNodeEnv ? 'node' : 'web', // node 模式时不会将 node.js 内置模块打包进输出文件中，例如： fs net模块等
    entry: {
      main: isNodeEnv ?
        getAbsolutePath('../../client/src/main-node.js') :
        (
          isProduction ? getAbsolutePath('../../client/src/main-web.js') : [
            'react-hot-loader/patch', // hot load for dev
            getAbsolutePath('../../client/src/main-web.js'),
          ]
        ),
    },

    // output 配置
    output: {
      path: isNodeEnv ?
        getAbsolutePath('../../app/public/ssr') :
        getAbsolutePath('../../app/public/csr'),
      libraryTarget: isNodeEnv ? 'commonjs2' : undefined,
      hashDigestLength: 8,
      publicPath: buildEnvConfig.publicPath,
      chunkFilename: buildEnvConfig.jsChunkFilename,
      filename: buildEnvConfig.jsFilename,
      clean: true,
    },

    // node_modules 目录下的第三方模块不会打包进输出文件中
    externals: isNodeEnv ? [
      '@loadable/component',
      nodeExternals({
        allowlist: [],
      }),
    ] : undefined,

    plugins: [
      new CleanWebpackPlugin(),
      new LoadablePlugin(),
      new MiniCssExtractPlugin({
        filename: buildEnvConfig.cssFilename,
        chunkFilename: buildEnvConfig.cssChunckFilename,
      }),
      ...(isAnalyzer ? [
        new BundleAnalyzerPlugin({ // @see https://github.com/coryhouse/react-slingshot/issues/301
          analyzerMode: 'static',
        }),
      ] : []),
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },

        {
          test: /\.(scss|css)$/,
          use: [
            // 'style-loader',  // 将 JS 字符串生成为 style 节点  冲突：https://github.com/vuejs/vue-ssr-docs/issues/196
            MiniCssExtractPlugin.loader, // 构建时输出文件
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
            'sass-loader', // 将 Sass 编译成 CSS，默认使用 Node Sass
          ],
        },

        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ],
    },
  };
};
