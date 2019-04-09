import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom';
import App from '../shared/App';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>MPR NEWS WITH SSR</title>
        <script src="/bundle.js" defer>${<App />}</script>
      </head>

      <body>
        <div id="root"></div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('Server is listening');
});
