/*eslint no-console: 0*/
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/story/:slug', (req, res) => {
    // server.get('/story/:slug*', (req, res) => {
      // return app.render(req, res, '/story', { slug: req.params.slug });
      app.render(req, res, '/story', { slug: req.params.slug })
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('🚀 Ready on http://localhost:3000\n');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
