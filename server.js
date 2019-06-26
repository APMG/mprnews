/*eslint no-console: 0*/
const express = require('express');
const nextjs = require('next');
const fetch = require('isomorphic-unfetch');
const { getDateTimes, formatEachDateTime } = require('./utils/scheduleUtils');
const { daysofweek } = require('./server/daysofweek');

const port = parseInt(process.env.APP_PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({ dev });
const handle = app.getRequestHandler();
const { pages } = require('./server/pages');
const { collections } = require('./server/collections');

const slug = (req, res, next) => {
  req.slug = req.path.replace(
    /^(\/newspartners)*\/(amp)*(story|episode|page|people)\//,
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

    server.get('_next/*', (req, res) => {
      return handle(req, res);
    });
    server.get('*', (req, res, next) => {
      const slug = req.path.replace(/^\//, '');
      const query = JSON.stringify({
        query: `{ content(slug: "${slug}",  contentAreaSlug: "mprnews") { resourceType } }`
      });
      const routes = {
        story: '/story',
        collection: '/collection',
        page: '/page'
      };
      const fetchRoute = async () => {
        return await fetch(process.env.GRAPHQL_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: query
        })
          .then((response) => {
            if (!response.ok) {
              next();
            }
            return response.json();
          })
          .then((response) => {
            const content = response.data.content;
            if (!content) {
              return next();
            }
            const route = response.data.content.resourceType;
            return app.render(req, res, routes[route], { slug: slug });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
      fetchRoute();
    });

    server.get('/', (req, res) => {
      app.render(req, res, '/index');
    });

    server.get('/search', (req, res) => {
      app.render(req, res, '/search');
    });
    server.get('/scribble', (req, res) => {
      app.render(req, res, '/scribble');
    });

    server.get('/story/card/*', (req, res) => {
      app.render(req, res, '/twitter', req.twitterSlug);
    });

    server.get('/newspartners/story/*', (req, res) => {
      app.render(req, res, '/newspartnerstory', { slug: req.slug });
    });

    server.get('/preview/stories/*', (req, res) => {
      app.render(req, res, '/story', {
        slug: req.previewSlug,
        previewToken: req.previewToken
      });
    });

    server.get(`/topic/:id/:page?`, (req, res) => {
      const queryParams = {
        collection: req.params.id,
        pageNum: parseInt(req.params.page ? req.params.page : 1),
        slug: req.slug
      };
      app.render(req, res, '/collection', queryParams);
    });

    server.get('/ampstory/*', (req, res) => {
      app.render(req, res, '/ampstory', { slug: req.slug });
    });

    server.get('/story/*', (req, res) => {
      app.render(req, res, '/story', { slug: req.slug });
    });

    server.get('/episode/*', (req, res) => {
      app.render(req, res, '/episode', { slug: req.slug });
    });

    server.get('/preview/episodes/*', (req, res) => {
      app.render(req, res, '/episode', {
        slug: req.previewSlug,
        previewToken: req.previewToken
      });
    });

    server.get('/ampepisode/*', (req, res) => {
      app.render(req, res, '/ampepisode', { slug: req.slug });
    });

    server.get('/page/*', (req, res) => {
      app.render(req, res, '/page', { slug: req.slug });
    });

    server.get('/people/*', (req, res) => {
      app.render(req, res, '/profile', { slug: req.slug });
    });

    server.get('/preview/pages/*', (req, res) => {
      app.render(req, res, '/page', {
        slug: req.previewSlug,
        previewToken: req.previewToken
      });
    });

    server.get('/amppage/*', (req, res) => {
      app.render(req, res, '/amppage', { slug: req.slug });
    });

    server.get('/schedule/:day?', (req, res, next) => {
      const daysOfThisWeek = getDateTimes();
      const formattedDate = formatEachDateTime(daysOfThisWeek, req.daySlug);

      const fetchSchedule = async (dateTime) => {
        try {
          return await fetch(
            `http://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=${dateTime}`
          )
            .then(function(response) {
              if (!response.ok) {
                next();
              }
              return response.json();
            })
            .then(function(response) {
              app.render(req, res, '/schedule', {
                slug: req.daySlug,
                props: response
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        } catch (error) {
          next();
          console.log(error);
        }
      };
      fetchSchedule(formattedDate);
    });

    server.get('/weather/:id?', (req, res) => {
      app.render(req, res, '/weather', { id: req.params.id });
    });

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
