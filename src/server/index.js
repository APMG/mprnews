import express from 'express';
import React from 'react';
import { ServerLocation } from 'apm-titan';
import { renderToString } from 'react-dom/server';
// import { ApolloProvider, renderToStringWithData } from 'react-apollo';
// import { HelmetProvider } from 'react-helmet-async';
import App from '../shared/App';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('*', (req, res) => {
  const context = {};
  const markup = renderToString(
    <ServerLocation url={req.url} context={context}>
      <App />
      {req.url}
    </ServerLocation>
  );

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>MPR NEWS WITH SSR</title>
        <script src="/bundle.js" defer></script>
      </head>

      <body>
        <div id="root">${markup}</div>
      </body>
    </html>
  `);
  console.log(res);
});

app.listen(PORT, () => {
  console.log('Server is listening');
});
