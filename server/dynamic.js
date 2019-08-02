const { ssGql } = require('./ssGql');
// Dynamic Routing for collections and pages
module.exports.dynamic = (server, app, handle) => {
  server.get('*', (req, res, next) => {
    // Since this is dynamic we need to
    // bail if this is a static asset
    if (req.path.match(/^\/favicon|_next|static/)) {
      return handle(req, res);
    }

    let path = req.path.replace(/^\//, '');
    path = path.replace(/\/$/, '');
    const slug = path.replace(/\/\d+$/, '');
    const pageNum = path.match(/\d+$/) ? path.match(/\d+$/)[0] : 1;
    const query = JSON.stringify({
      query: `{ content(slug: "${slug}",  contentAreaSlug: "${process.env.CONTENT_AREA_SLUG}") { resourceType } }`
    });
    const routes = {
      collection: '/collection',
      page: '/page'
    };

    ssGql(query, next).then((data) => {
      if (typeof data === 'undefined') return;
      res.set('Cache-Control', 'public, max-age=60');
      return app.render(req, res, routes[data.resourceType], {
        slug: slug,
        pageNum: pageNum.toString()
      });
    });
  });
};
