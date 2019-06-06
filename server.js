/*eslint no-console: 0*/
const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

var slug = (req, res, next) => {
  const pathParts = req.path.split('/')
  pathParts.shift();
  pathParts.shift();
  req.slug = pathParts.join('/');
  next();
}

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(slug);

    server.get('/story/*', (req, res) => {
      app.render(req, res, '/story', { slug: req.slug })
    });

    server.get('/ampstory/*', (req, res) => {
      app.render(req, res, '/ampstory', { slug: req.slug })
    });

    server.get('/episode/*', (req, res) => {
      app.render(req, res, '/episode', { slug: req.slug })
    });

    server.get('/ampepisode/*', (req, res) => {
      app.render(req, res, '/ampepisode', { slug: req.slug })
    });

    server.get('/page/*', (req, res) => {
      app.render(req, res, '/page', { slug: req.slug })
    });

    server.get('/amppage/*', (req, res) => {
      app.render(req, res, '/amppage', { slug: req.slug })
    });




    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`🚀 Ready on http://localhost:${port}\n`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });



