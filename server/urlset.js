const { linkByTypeAs } = require('../utils/cjsutils');

module.exports.urlset = (server) => {
  const pageSize = 100;
  // RSS feeds for collections
  server.get(`/sitemap/urlset/:pageNum`, (req, res) => {
    const pageNum = req.params.pageNum || 1;
    res.header('Content-Type', 'text/xml');
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    const query = JSON.stringify({
      query: `
        {
          sitemap: contentList(contentAreaSlug: "${process.env.CONTENT_AREA_SLUG}", contentTypes: [STORIES, PAGES, EPISODES], pageSize:${pageSize}, page: ${pageNum}) {
            totalPages
            items {
                  id
                  slugs
                  resourceType
                  canonicalSlug
                  updatedAt
                }
          }
        }
      `
    });
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const fetchFeedData = async (query) => {
      return await fetch(process.env.GRAPHQL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: query
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error('Error: ', err);
        });
    };
    const queryRes = fetchFeedData(query);
    queryRes.then((results) => {
      results.data.sitemap.items.forEach((item) => {
        const path = linkByTypeAs(item);
        xml += '<url>';
        xml += `<loc>${req.protocol}://${req.headers.host}${path}</loc>`;
        xml += '</url>';
      });
      xml += '</urlset>';
      res.set('Cache-Control', 'public, max-age=1800'); // 30 minutes
      res.send(xml);
    });
  });
};
