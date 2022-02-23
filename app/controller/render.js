'use strict';

module.exports = app => {
  class RenderController extends app.Controller {
    async render() {
      const { ctx } = this;
      const { url, path } = ctx;

      ctx.info = {
        siteName: 'react ssr example',
      };

      await ctx.renderSSR({
        url,
        path,
      });
    }
  }

  return RenderController;
};
