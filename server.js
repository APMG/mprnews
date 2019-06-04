/*eslint no-console: 0*/
const express = require('express')
const next = require('next');
const routes = require('./routes');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  express().use(handler).listen(3000, err => {
    if (err) throw err;
    console.log('🚀 Ready on http://localhost:3000 \n');
  })
});
