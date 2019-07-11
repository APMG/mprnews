/*eslint no-console: 0*/
const express = require('express');
const compression = require('compression');
const nextjs = require('next');
const { daysofweek } = require('./server/daysofweek');

const port = parseInt(process.env.APP_PORT, 10) || 3000;
const dev =
  process.env.RAILS_ENV !== 'stage' && process.env.RAILS_ENV !== 'production';
const app = nextjs({ dev });
const handle = app.getRequestHandler();
const { feed } = require('./server/feed');
const { schedule } = require('./server/schedule');
const { dynamic } = require('./server/dynamic');
const { sitemap } = require('./server/sitemap');
const { urlset } = require('./server/urlset');

const TTL = 60;

const slug = (req, res, next) => {
  req.slug = req.path.replace(
    /^(\/newspartners)*\/(amp\/)*(story|episode|page|people)\/(card\/)*/,
    ''
  );
  next();
};

// TODO: in the case of the weather page, this actually grabs the city name? Might need a more generic name for this thing.
const daySlug = (req, res, next) => {
  const pathParts = req.path.split('/');
  req.daySlug = pathParts.pop();
  // if we get /schedule not /schedule/day
  if (daysofweek().indexOf(req.daySlug) === -1) {
    req.daySlug = daysofweek()[new Date().getDay()];
  }
  next();
};

const previewSlug = (req, res, next) => {
  req.previewSlug = req.path.replace(
    /\/preview\/(episodes|stories|page|people)\//,
    ''
  );
  next();
};

const twitterSlug = (req, res, next) => {
  req.twitterSlug = req.path.replace(/^(\/story|episode|page)*\/(card)\//, '');
  next();
};

const previewToken = (req, res, next) => {
  req.previewToken = req.query.token;
  next();
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(slug, previewSlug, previewToken, daySlug, twitterSlug);

    // gzip in prod
    if (!dev) {
      server.use(compression());
    }

    //Root route
    server.get('/', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/index');
    });

    // Search Routing
    server.get('/search', (req, res) => {
      app.render(req, res, '/search');
    });

    // Listen Routing
    server.get('/listen', (req, res) => {
      app.render(req, res, '/listen');
    });

    // Scribble Live Routing
    server.get('/scribble', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/scribble');
    });

    // Weather routing
    server.get('/weather/:id?', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/weather', { id: req.params.id });
    });

    // Story routing

    server.get('/story/card/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/twitter', req.twitterSlug);
    });

    server.get('/story/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/story', { slug: req.slug, isNewsPartners: false });
    });

    server.get('/newspartners/story/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/newspartnerstory', {
        slug: req.slug,
        isNewsPartners: true
      });
    });

    // Profile Routing
    server.get('/people/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/profile', { slug: req.slug });
    });

    // Preview Routing
    server.get('/preview/pages/*', (req, res) => {
      app.render(req, res, '/page', {
        slug: req.previewSlug,
        previewToken: req.previewToken
      });
    });

    server.get('/preview/stories/*', (req, res) => {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      app.render(req, res, '/story', {
        slug: req.previewSlug,
        previewToken: req.previewToken
      });
    });

    server.get('/preview/episodes/*', (req, res) => {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      app.render(req, res, '/episode', {
        slug: req.previewSlug,
        previewToken: req.previewToken
      });
    });

    // AMP Routing
    server.get('/amp/story/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/ampstory', { slug: req.slug });
    });

    server.get('/amp/episode/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/ampepisode', { slug: req.slug });
    });

    server.get('/amp/page/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/amppage', { slug: req.slug });
    });

    // Episode Routing
    server.get('/episode/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/episode', { slug: req.slug });
    });

    server.get('/newspartners/:pageNum?', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      const pageNum = req.params.pageNum || 1;
      app.render(req, res, '/collection', {
        slug: 'newspartners',
        pageNum: pageNum,
        isNewsPartners: true
      });
    });
    // schedule route
    schedule(server, app);

    // imported RSS route
    feed(server);

    // imported sitemap route
    sitemap(server);

    // imported sitemap route
    urlset(server);

    // Dynamic Routing for collections and pages
    dynamic(server, app, handle);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`\nReady on http://localhost:${port} 🚀\n`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
