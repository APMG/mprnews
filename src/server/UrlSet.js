import { sitemapFetchById, globalHostFunc } from './utils';
import mprNewsConfig from '../shared/config/config';
export default function UrlSet(app) {
  app.use('/sitemap/urlset/:id', function(req, res) {
    sitemapFetchById(mprNewsConfig.slug, req.params.id).then(function(
      response
    ) {
      res.header('Content-Type', 'text/xml');
      globalHostFunc(req);

      let xmlString = `<?xml version="1.0" encoding="UTF-8"?>

  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
      response.data.sitemap.items.forEach((type) => {
        xmlString += `
              <sitemap>
                <loc>https://${global.host}/${type.resourceType}/${
          type.canonicalSlug
        }</loc>
          <lastmod>${type.updatedAt}</lastmod>
              </sitemap>
          `;
      });

      xmlString += `</sitemapindex> `;
      res.send(xmlString);
    });
  });
}
