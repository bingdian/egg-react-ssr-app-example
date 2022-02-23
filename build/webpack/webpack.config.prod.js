'use strict';

const { merge } = require('webpack-merge');
const nodeCommonConfig = require('./webpack.common')(true);
const browserCommonConfig = require('./webpack.common')(false);
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => {
  const config = {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: true,
          extractComments: false,
          terserOptions: {
            ie8: false,
            safari10: false,
            warnings: false,
            compress: {
              dead_code: true,
              drop_console: true,
              drop_debugger: true,
            },
            output: {
              comments: false,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          lib: {
            test: /(react)/,
            chunks: 'all',
            name: 'lib',
            priority: 20,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendor',
            priority: 10,
          },
          style: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            test: /\.(css|less|scss|stylus)$/,
            enforce: true,
            priority: 50,
          },
        },
      },
    },
  };
  return [
    merge(browserCommonConfig, config),
    merge(nodeCommonConfig, config),
  ];
};
