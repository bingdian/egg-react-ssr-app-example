/**
 * 本地开发环境配置
 */

'use strict';


module.exports = () => {
  const config = {};

  config.development = {
    overrideIgnore: true,
    watchDirs: [
      'app/public/ssr',
    ],
  };

  return config;
};
