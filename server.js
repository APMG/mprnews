/*eslint no-console: 0*/
const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/story/*', (req, res) => {
      let pathname = req.originalUrl;
      let slug = pathname.split('/story/')[1]
      app.render(req, res, '/story', { slug: slug })
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`\n🚀 Ready on http://localhost:${port}\n`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
