import { sitemapFetch, globalHostFunc } from './utils';
import mprNewsConfig from '../shared/config/config';

export default function Sitemap(app) {
  app.use('/sitemap/?$', (req, res) => {
    sitemapFetch(mprNewsConfig.slug).then(function(response) {
      res.header('Content-Type', 'text/xml');
      globalHostFunc(req);

      let xmlString = `<?xml version="1.0" encoding="UTF-8"?>

    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
      for (let i = 1; i <= response.data.contentArea.totalPages; i++) {
        xmlString += `
            <sitemap>
              <loc>https://${global.host}/sitemap/urlset/${i}</loc>
            </sitemap>
      `;
      }

      xmlString += `</sitemapindex> `;
      res.send(xmlString);
    });
  });
}
