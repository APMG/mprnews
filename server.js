/*eslint no-console: 0*/
// require('newrelic');
const express = require('express');
const nextjs = require('next');
const fetch = require('isomorphic-unfetch');
const { daysofweek } = require('./server/daysofweek');
const { getDateTimes, formatEachDateTime } = require('./utils/scheduleUtils');
const port = parseInt(process.env.APP_PORT, 10) || 3000;
const dev =
  process.env.RAILS_ENV !== 'common_dev' &&
  process.env.RAILS_ENV !== 'stage' &&
  process.env.RAILS_ENV !== 'production';
const app = nextjs({ dev });
const handle = app.getRequestHandler();
const { feed } = require('./server/feed');
const { dynamic } = require('./server/dynamic');
const { sitemap } = require('./server/sitemap');
const { urlset } = require('./server/urlset');
const { ssGql } = require('./server/ssGql');
const { mostViewed } = require('./server/mostViewed');
const { membershipPotlatch } = require('./server/membershipPotlatch');
const { format } = require('date-fns');

const logUrls = (req, res, next) => {
  const line = logLine(req, res);
  console.info(line);
  next();
};

const logLine = (req, res) => {
  const timestamp = format(new Date(), 'dd/MMM/yyyy:H:mm:ss xxxx');
  const line = ` - - [${timestamp}] "${req.method} ${req.headers.host}${req.originalUrl} ${req.protocol}" ${res.statusCode}  "-"  "${req.connection.remoteAddress}" -`;
  return line;
};

const logError = (err, req, res, next) => {
  const line = logLine(req, res);
  console.error(`ERROR: ${line} \n${err}`);
  next();
};

const TTL = 60;
const ampQuery = (slug) =>
  JSON.stringify({
    query: `{ content(slug: "${slug}",  contentAreaSlug: "${process.env.CONTENT_AREA_SLUG}") { supportedOutputFormats } }`
  });

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
  if (req.path.match(/\/static/) || req.path.match(/\/_next/)) {
    next();
    return;
  }
  req.twitterSlug = req.path.replace(/^(\/story|episode|page)*\/(card)\//, '');
  next();
};

const previewToken = (req, res, next) => {
  req.previewToken = req.query.token;
  next();
};

const pageNum = (req, res, next) => {
  if (req.path.match(/\/static/) || req.path.match(/\/_next/)) {
    next();
    return;
  }

  let path = req.path.replace(/^\//, '');
  path = path.replace(/\/$/, '');
  req.pageNum = path.match(/\/([0-9]+)$/)
    ? path.match(/\/([0-9]+)$/)[0].replace('/', '')
    : 1;
  next();
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      slug,
      previewSlug,
      previewToken,
      daySlug,
      twitterSlug,
      pageNum,
      logUrls,
      logError
    );

    //Root route
    server.get('/', function homeRequest(req, res) {
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

    // schedule api route
    server.get('/api/schedule/:day?', async (req, res) => {
      const fetchSchedule = async () => {
        try {
          const daysOfThisWeek = getDateTimes();
          const formattedDate = await formatEachDateTime(
            daysOfThisWeek,
            req.daySlug
          );
          const scheduleUrl = await `${process.env.SCHEDULER_API}?datetime=${formattedDate}`;
          let request = await fetch(scheduleUrl);
          let response = await request.json();
          return response;
        } catch (err) {
          console.error(err);
        }
      };

      let data = await fetchSchedule();
      res.set('Cache-Control', 'public,max-age=60');
      res.send(data);
    });

    // schedule route
    server.get('/schedule/:day?', (req, res) => {
      res.set('Cache-Control', `public, max-age=60`);
      app.render(req, res, '/schedule', {
        slug: req.daySlug
      });
    });

    // Story routing
    server.get('/story/card/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/twitter', { slug: req.twitterSlug });
    });

    server.get('/story/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/story', { slug: req.slug });
    });

    server.get('/newspartners/story/*', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/newspartnerstory', {
        slug: req.slug
      });
    });

    // Profile Routing
    server.get('/people/:slug/:pageNum?', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/profile', req.params);
    });

    // AMP Routing
    server.get('/amp/story/*', (req, res, next) => {
      ssGql(ampQuery(req.slug), next).then((data) => {
        if (typeof data === 'undefined') return;
        if (data.supportedOutputFormats.indexOf('amp') === -1) {
          res.status(404).send('Not Found');
          return;
        }
        res.set('Cache-Control', `public, max-age=${TTL}`);
        app.render(req, res, '/ampstory', { slug: req.slug });
      });
    });

    server.get('/amp/episode/*', (req, res, next) => {
      ssGql(ampQuery(req.slug), next).then((data) => {
        if (typeof data === 'undefined') return;
        if (data.supportedOutputFormats.indexOf('amp') === -1) {
          res.status(404).send('Not Found');
          return;
        }
        res.set('Cache-Control', `public, max-age=${TTL}`);
        app.render(req, res, '/ampepisode', { slug: req.slug });
      });
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
        pageNum: pageNum
      });
    });

    // all-news routing
    server.get('/all-news/:pageNum?', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      const pageNum = req.params.pageNum || 1;
      app.render(req, res, '/allnews', {
        pageNum: pageNum
      });
    });

    // election calendar route
    server.get('/election2020/calendar', (req, res) => {
      res.set('Cache-Control', `public, max-age=${TTL}`);
      app.render(req, res, '/electioncalendar');
    });

    // imported RSS route
    feed(server);

    // imported sitemap route
    sitemap(server);

    // imported sitemap route
    urlset(server);

    // Dynamic Routing for collections and pages
    dynamic(server, app, handle);

    // imported mostViewed from Google Analytics api route
    mostViewed(server);

    // api endpoint to get json from potlatch about member drive
    membershipPotlatch(server);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`\nReady on http://localhost:${port} 🚀\n`);
    });
  })
  .catch((e) => {
    console.error(e.stack);
    process.exit(1);
  });

process.on('SIGINT', (msg) => {
  console.log(`Received SIGINT with message ${msg}.`);
  // by default, you have 1600ms
  process.exit(0);
});
