/*eslint no-console: 0*/
const express = require('express');
const next = require('next');
const axios = require('axios');
const { getDateTimes, formatEachDateTime } = require('./utils/scheduleUtils');

const port = parseInt(process.env.APP_PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const slug = (req, res, next) => {
  req.slug = req.path.replace(/^(\/newspartners)*\/(story|episode|page)\//, '');
  next();
};

const daySlug = (req, res, next) => {
  const pathParts = req.path.split('/');
  req.daySlug = pathParts.pop();
  next();
};

const previewSlug = (req, res, next) => {
  req.previewSlug = req.path.replace(
    /\/preview\/(episodes|stories|page)\//,
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

    server.get('/', (req, res) => {
      app.render(req, res, '/index');
    });

    server.get('/search', (req, res) => {
      app.render(req, res, '/search');
    });
    server.get('/scribble', (req, res) => {
      app.render(req, res, '/scribble');
    });

    // server.get('/story/*', (req, res) => {
    //   app.render(req, res, '/story', { slug: req.slug });
    // });

    server.get('/story/card/*', (req, res) => {
      console.log('reqqqq', req.twitterSlug);
      app.render(
        req,
        res,
        '/twitter',
        // slug: req.slug.replace(/card/\/, '')
        req.twitterSlug
      );
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

    server.get('/preview/pages/*', (req, res) => {
      app.render(req, res, '/page', {
        slug: req.previewSlug,
        previewToken: req.previewToken
      });
    });

    server.get('/amppage/*', (req, res) => {
      app.render(req, res, '/amppage', { slug: req.slug });
    });

    server.get('/schedule/*', (req, res) => {
      const dates = getDateTimes();
      const formattedDate = formatEachDateTime(dates, req.daySlug);
      const fetchSchedule = async (dateTime) => {
        try {
          return await axios
            .get(
              `http://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=${dateTime}`
            )
            .then((response) => {
              app.render(req, res, '/schedule', {
                slug: req.daySlug,
                props: response.data
              });
            });
        } catch (error) {
          console.log(error);
        }
      };
      fetchSchedule(formattedDate);
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
