const fetch = require('isomorphic-unfetch');

// Dynamic Routing for collections and pages
module.exports.dynamic = (server, app) => {
  server.get('*', (req, res, next) => {
    const path = req.path.replace(/^\//, '');
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
