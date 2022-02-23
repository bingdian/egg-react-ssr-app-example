/**
 * webpack build env config
 */
'use strict';

const { NODE_ENV } = process.env;

const config = {
  production: {
    publicPath: '/assets/',
    jsChunkFilename: '[name].[chunkhash].js',
    jsFilename: '[name].[chunkhash].js',
    cssFilename: '[name].[contenthash].css',
    cssChunkFilename: '[name].[contenthash].css',
  },
  development: {
    publicPath: '/assets/',
    jsChunkFilename: '[name].js',
    jsFilename: '[name].js',
    cssFilename: '[name].css',
    cssChunkFilename: '[name].css',
  },
};

module.exports = config[ NODE_ENV ];
