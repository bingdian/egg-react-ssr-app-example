/**
 * webpack define plugin config
 */
'use strict';

const { NODE_ENV } = process.env;

const defineConfig = {
  production: {
    ENV_IS_DEV: false,
    ENV_IS_PROD: true,
    ENV_IS_NODE: !!this.ssr,
  },
  development: {
    ENV_IS_DEV: true,
    ENV_IS_PROD: false,
    ENV_IS_NODE: true,
  },
};

module.exports = defineConfig[ NODE_ENV ];
