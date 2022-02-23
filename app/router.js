'use strict';

module.exports = app => {
  const {
    router,
    controller,
  } = app;

  router.opts.strict = true;

  router.get('/', controller.render.render);
  router.get('/about', controller.render.render);
};
