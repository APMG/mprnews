import { globalHostFunc, sitemapFetch } from './utils';
import { site } from '../shared/config/index';
export default function Sitemap(app) {
  app.use('/sitemap/?$', (req, res) => {
    globalHostFunc(req).split(':')[0];

    sitemapFetch(site.slug).then(function(data) {
      res.header('Content-Type', 'text/xml');

      let xmlString = `<?xml version="1.0" encoding="UTF-8"?>

    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      for (let i = 1; i <= data.total_pages; i++) {
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
