import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';

export default async (req, res) => {
  const pageSize = 100;
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  const query = JSON.stringify({
    query: `
        {
          sitemap: contentList(contentAreaSlug: "${process.env.CONTENT_AREA_SLUG}", contentTypes: [STORIES, PAGES, EPISODES], pageSize:${pageSize}) {
            totalPages
          }
        }
      `,
  });
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const fetchFeedData = async (query) => {
    return await fetch(process.env.GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: query,
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
  const { protocol } = absoluteUrl(req);
  const queryRes = fetchFeedData(query);
  queryRes.then(() => {
    // graphql limited to 100 for now
    // when that limit is solved,  use  results.data.sitemap.totalPages
    for (let page = 1; page <= 100; page++) {
      xml += '<sitemap>';
      xml += `<loc>${protocol}//${req.headers.host}/api/sitemap/urlset/${page}</loc>`;
      xml += '</sitemap>';
    }
    xml += '</sitemapindex>';
    res.setHeader('Cache-Control', 'public, max-age=1800'); // 30 minutes
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(xml);
  });
};
