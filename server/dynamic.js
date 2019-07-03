const fetch = require('isomorphic-unfetch');
const TTL = 60;

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
    const fetchRoute = async () => {
      return await fetch(process.env.GRAPHQL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: query
      })
        .then((response) => {
          if (!response.ok) {
            next();
          }
          return response.json();
        })
        .then((response) => {
          const content = response.data.content;
          if (!content) {
            return next();
          }
          const route = response.data.content.resourceType;
          res.set('Cache-Control', `public, max-age=${TTL}`);
          return app.render(req, res, routes[route], {
            slug: slug,
            pageNum: pageNum
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error('Error:', error);
        });
    };
    fetchRoute();
  });
};
