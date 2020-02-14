import { format } from 'date-fns';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
import fetch from 'isomorphic-unfetch';
import { linkByTypeAs } from '../../utils/cjsutils';
// import { Body } from '@apmg/amat';

const Rss = () => {};

Rss.getInitialProps = async ({ query: { slug }, res }) => {
  const query = () => {
    return JSON.stringify({
      query: `{collection(contentAreaSlug: "${
        process.env.CONTENT_AREA_SLUG
      }", slug: "${slug.join('/')}") {
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
                    shortCaption
                    preferredAspectRatio {
                      instances {
                        url
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }}`
    });
  };

  const fetchFeedData = async (query) => {
    return await fetch(process.env.GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: query()
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

  // function getImage(item) {
  //   let result;
  //   const primaryImg = item.primaryVisuals.thumbnail;

  //   if (primaryImg) {
  //     result = `<img src="${primaryImg.preferredAspectRatio.instances[0].url}" alt="${primaryImg.shortCaption}" height="${primaryImg.preferredAspectRatio.instances[0].height}" width="${primaryImg.preferredAspectRatio.instances[0].width}"/>`;
  //   } else {
  //     result = '';
  //   }
  //   return result;
  // }

  if (!res) {
    return;
  }
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml +=
    '<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">';
  xml += '<channel>';

  const results = await fetchFeedData(query);

  const feed = results.data.collection;
  xml += `<title>${feed &&
    results.data.collection.title.replace(/&/, '&amp;')} - MPR News</title>`;
  xml += `<atom:link
      href="https://www.mprnews.org/feed/${feed &&
        results.data.collection.canonicalSlug}"
      rel="self"
      type="application/rss+xml"/> `;
  xml += `<description><![CDATA[${feed &&
    results.data.collection.descriptionText}]]></description>`;
  xml += `<language>en-us</language>`;
  xml += `<lastBuildDate>${format(
    new Date(feed && results.data.collection.publishDate),
    "yyyy-MM-dd-'T'HH:mm:ssxx"
  )}</lastBuildDate>`;

  feed &&
    results.data.collection.results.items.forEach((item) => {
      if (item.resourceType === 'link') {
        return;
      }
      const link = linkByTypeAs(item);
      const dte = format(
        new Date(item.publishDate),
        "yyyy-MM-dd-'T'HH:mm:ssxx"
      );
      // const ele = React.createElement(Body, {
      //   nodeData: JSON.parse(item.body),
      //   embedded: JSON.parse(item.embeddedAssetJson),
      //   minimal: false
      // });
      // const markupImg = getImage(item);
      // const markup = ReactDOMServer.renderToStaticMarkup(ele);

      xml += `<item>
                  <title>${item.title.replace(/&/, '&amp;')}</title>
                  <link>https://www.mprnews.org${link}</link>
                  <guid isPermaLink="true">https://www.mprnews.org${link}</guid>
                  <pubDate>${dte}</pubDate>
                  <description><![CDATA[${item.descriptionText}]]></description>
                </item>`;
    });

  xml += '</channel>';
  xml += '</rss>';
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', `public, max-age=60`);
  res.write(xml);
  res.end();
};

export default Rss;
