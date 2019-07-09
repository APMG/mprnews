const { format } = require('date-fns');
const { linkByTypeAs } = require('../utils/cjsutils');

module.exports.feed = (server) => {
  // RSS feeds for collections
  server.get(`/feed/*`, (req, res) => {
    res.header('Content-Type', 'text/xml');
    res.set('Cache-Control', `public, max-age=60`);
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    const query = JSON.stringify({
      query: `{collection(contentAreaSlug: "${
        process.env.CONTENT_AREA_SLUG
      }", slug: "${req.params['0']}") {
            canonicalSlug
            title
            descriptionText
            updatedAt
            results(pageSize: 30) {
              items {
                title
                descriptionText
                resourceType
                canonicalSlug
                updatedAt
              }
            }
          }}`
    });

    xml +=
      '<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">';
    xml += '<channel>';
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
      xml += `<title>${results.data.collection.title} - MPR News</title>`;
      xml += `<description>${results.data.collection.descriptionText}</description>`;
      xml += `<pubDate>${format(
        new Date(results.data.collection.updatedAt),
        'ddd, D MMM YYYY HH:mm:ss ZZ'
      )}</pubDate>`;
      xml += `<atom:link
                href="https://www.mprnews.org/feed/${results.data.collection.canonicalSlug}"
                rel="self"
                type="application/rss+xml"/> `;
      results.data.collection.results.items.forEach((item) => {
        if (item.resourceType === 'link') {
          return;
        }
        const link = linkByTypeAs(item);
        const dte = format(
          new Date(item.updatedAt),
          'ddd, D MMM YYYY HH:mm:ss ZZ'
        );
        xml += `<item>
                      <pubDate>${dte}</pubDate>
                      <title>${item.title}</title>
                      <description>${item.descriptionText}</description>
                      <link>https://www.mprnews.org${link}</link>
                      <guid isPermaLink="true">https://www.mprnews.org${link}</guid>
                    </item>`;
      });
      xml += '</channel>';
      xml += '</rss>';
      res.send(xml);
    });
  });
};
