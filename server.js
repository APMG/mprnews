/*eslint no-console: 0*/
const express = require('express');
const next = require('next');
const port = parseInt(process.env.APP_PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const slug = (req, res, next) => {
  const pathParts = req.path.split('/')
  pathParts.shift();
  pathParts.shift();
  req.slug = pathParts.join('/');
  next();
}

const daySlug = (req, res, next) => {
  const pathParts = req.path.split('/')
  req.daySlug = pathParts.pop()
  next()
}

const previewSlug = (req, res, next) => {
  req.previewSlug = req.path.replace(/\/preview\/(episodes|stories|pages)\//, '');
  next();
}

const previewToken = (req, res, next) => {
  req.previewToken = req.query.token;
  next();
}

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(slug, previewSlug, previewToken, daySlug);

    server.get('/', (req, res) => {
      app.render(req, res, '/index') 
    })
    server.get('/story/*', (req, res) => {
      app.render(req, res, '/story', { slug: req.slug })
    });

    server.get('/preview/stories/*', (req, res) => {
      app.render(req, res, '/story', { slug: req.previewSlug, previewToken: req.previewToken })
    });

    server.get('/ampstory/*', (req, res) => {
      app.render(req, res, '/ampstory', { slug: req.slug })
    });

    server.get('/episode/*', (req, res) => {
      app.render(req, res, '/episode', { slug: req.slug })
    });

    server.get('/preview/episodes/*', (req, res) => {
      app.render(req, res, '/episode', { slug: req.previewSlug, previewToken: req.previewToken })
    });

    server.get('/ampepisode/*', (req, res) => {
      app.render(req, res, '/ampepisode', { slug: req.slug })
    });

    server.get('/page/*', (req, res) => {
      app.render(req, res, '/page', { slug: req.slug })
    });

    server.get('/preview/pages/*', (req, res) => {
      app.render(req, res, '/page', { slug: req.previewSlug, previewToken: req.previewToken })
    });

    server.get('/amppage/*', (req, res) => {
      app.render(req, res, '/amppage', { slug: req.slug })
    });

    server.get('/schedule/*', (req, res) => {
      console.log('request',req.daySlug)
      app.render(req, res, '/schedule', { slug: req.daySlug })
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`\nReady on http://localhost:${port} 🚀\n`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });