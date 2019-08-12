const { format } = require('date-fns');
const { linkByTypeAs } = require('../utils/cjsutils');
const fetch = require('isomorphic-unfetch');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Body } = require('@apmg/amat');

module.exports.feed = (server) => {
  // RSS feeds for collections
  server.get(`/feed/*`, (req, res) => {
    let feedSlug = req.path.replace(/\/feed\//, '');
    feedSlug = feedSlug.replace(/\/$/, '');
    res.header('Content-Type', 'text/xml');
    res.set('Cache-Control', `public, max-age=60`);
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    const query = JSON.stringify({
      query: `{collection(contentAreaSlug: "${process.env.CONTENT_AREA_SLUG}", slug: "${feedSlug}") {
            canonicalSlug
            title
            descriptionText
            publishDate
            results(pageSize: 30) {
              items {
                title
                body
                embeddedAssetJson
                descriptionText
                resourceType
                canonicalSlug
                publishDate
                primaryVisuals {
                  thumbnail {
                    xid
                    aspectRatios {
                      uncropped {
                        instances {
                          url
                          width
                          height
                        }
                      }
                    }
                    shortCaption
                  }
                }
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
    function hasImage(item, results) {
      let slug = results.data.collection.canonicalSlug;

      let result;
      if (slug.match(/outside/g) && item.primaryVisuals.thumbnail) {
        result = `<img src="${item.primaryVisuals.thumbnail.aspectRatios.uncropped.instances[0].url}" alt="${item.primaryVisuals.thumbnail.shortCaption}" height="${item.primaryVisuals.thumbnail.aspectRatios.uncropped.instances[0].height}" width="${item.primaryVisuals.thumbnail.aspectRatios.uncropped.instances[0].width}"/>`;
      } else {
        result = '';
      }
      return result;
    }

    const queryRes = fetchFeedData(query);
    queryRes.then((results) => {
      xml += `<title>${results.data.collection.title} - MPR News</title>`;
      xml += `<description><![CDATA[${results.data.collection.descriptionText}]]></description>`;
      xml += `<pubDate>${format(
        new Date(results.data.collection.publishDate),
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
          new Date(item.publishDate),
          'ddd, D MMM YYYY HH:mm:ss ZZ'
        );
        const ele = React.createElement(Body, {
          nodeData: JSON.parse(item.body),
          embedded: JSON.parse(item.embeddedAssetJson),
          minimal: false
        });
        const markupImg = hasImage(item, results);
        const markup = ReactDOMServer.renderToStaticMarkup(ele);
        const parseImgUrl = item.primaryVisuals.thumbnail.aspectRatios.uncropped.instances[0].url.split(
          '/'
        );

        const img = item.primaryVisuals.thumbnail;
        xml += `<item>
                  <pubDate>${dte}</pubDate>
                  <title>${item.title}</title>
                  <description><![CDATA[${item.descriptionText}]]></description>
                  <image>
                  <link>https://${parseImgUrl[2]}/</link>
                  <title>${item.title}</title>
                  <url>${img &&
                    img.aspectRatios.uncropped.instances[0].url}</url>
                  <description>${img && img.shortCaption}</description>
                  <height>${img &&
                    img.aspectRatios.uncropped.instances[0].height}</height>
                  <width>${img &&
                    img.aspectRatios.uncropped.instances[0].width}</width>
                  </image>
                  <content:encoded><![CDATA[${
                    item.primaryVisuals.thumbnail ? markupImg : ''
                  }${markup}]]></content:encoded>
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
