import { sitemapFetchById, globalHostFunc } from './utils';
import mprNewsConfig from '../shared/config/config';
export default function UrlSet(app) {
  app.use('/sitemap/urlset/:id', function(req, res) {
    sitemapFetchById(mprNewsConfig.slug, req.params.id).then(function(
      response
    ) {
      res.header('Content-Type', 'text/xml');
      globalHostFunc(req);

      let resourceConfig = ['profile', 'story', 'page'];
      let xmlString = `<?xml version="1.0" encoding="UTF-8"?>

  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      response.data.contentArea.items.forEach((type) => {
        if (resourceConfig.indexOf(type.resourceType) > -1) {
          xmlString += `
              <sitemap>
                <loc>https://${global.host}/${
            resourceConfig[resourceConfig.indexOf(type.resourceType)]
          }/${type.canonicalSlug}</loc>
          <lastmod>${type.updatedAt}</lastmod>
              </sitemap>
          `;
        }
      });

      xmlString += `</sitemapindex> `;
      res.send(xmlString);
    });
  });
}
