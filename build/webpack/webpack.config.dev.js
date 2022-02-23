'use strict';

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeCommonConfig = require('./webpack.common')(true);
const browserCommonConfig = require('./webpack.common')(false);
const path = require('path');

module.exports = () => {
  const config = {
    mode: 'development',
  };

  // dev server 配置
  const devServerConfig = {
    devtool: 'eval-source-map',
    devServer: {
      compress: true,
      hot: true,
      port: 9000,
      allowedHosts: 'all',
      devMiddleware: {
        writeToDisk: true,
      },
      static: {
        directory: path.join(__dirname, '../../app/public/csr'),
      },
      headers: { // 允许 hmr 跨域
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './client/src/layouts/index.html',
      }),
    ],
  };

  return [
    merge(browserCommonConfig, devServerConfig, config),
    merge(nodeCommonConfig, config),
  ];
};
