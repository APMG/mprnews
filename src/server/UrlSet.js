import { sitemapFetchById, globalHostFunc } from './utils';
import { site } from '../shared/config/index';

export default function UrlSet(app) {
  app.use('/sitemap/urlset/:id', function(req, res) {
    globalHostFunc(req).split(':')[0];

    sitemapFetchById(site.slug, req.params.id).then(function(data) {
      res.header('Content-Type', 'text/xml');

      let resourceConfig = ['profile', 'story', 'page'];
      let xmlString = `<?xml version="1.0" encoding="UTF-8"?>

  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      for (let i = 0; i < resourceConfig.length; i++) {
        data._embedded.items.map((type) => {
          if (type.resource_type === resourceConfig[i]) {
            xmlString += `
              <sitemap>
                <loc>https://${global.host}/${resourceConfig[i]}/${
              type.canonical_slug
            }</loc>
          <lastmod>${type.updated_at}</lastmod>
              </sitemap>
          `;
          }
        });
      }

      xmlString += `</sitemapindex> `;
      res.send(xmlString);
    });
  });
}
