'use strict';

const path = require('path');

module.exports = app => {
  const config = {};

  config.keys = ')T|PR6)#8}6}z8~:1"nAIEz_w+dz]IkH:1e?a4Q?h]LL?L=iV|5S5seGBC/MRDc';

  config.static = {
    prefix: '/assets/',
    dir: [
      path.join(app.baseDir, 'app/public/csr'),
    ],
  };

  config.view = {
    root: [
      path.join(app.baseDir, 'app/view'),
      path.join(app.baseDir, 'app/public/ssr'),
    ].join(','),
    mapping: {
      '.html': 'nunjucks',
      '.js': 'reactLoadable',
    },
  };

  config.reactLoadable = {
    nodeStatsFile: path.join(app.baseDir, 'app/public/ssr/loadable-stats.json'),
    webStatsFile: path.join(app.baseDir, 'app/public/csr/loadable-stats.json'),
    template: {
      renderSSR: {
        renderSSRTemplate: path.join(app.baseDir, 'app/view/layout.html'),
        viewEngine: 'nunjucks',
      },
    },
  };


  return config;
};
