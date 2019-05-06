import express from 'express';
import http from 'http';
import fs from 'fs';
import { ServerLocation } from 'apm-titan';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { HelmetProvider } from 'react-helmet-async';
import etag from 'etag';
import fresh from 'fresh';
import { client } from '../shared/graphqlClient';
import App from '../shared/App';

const Graceful = require('node-graceful');
const server = express();
const APP_PORT = process.env.APP_PORT || 4000;
const helmetContext = {};
let currentApp = server;
const filepath =
  process.env.APP_PATH === 'relative' ? 'build' : 'current/mprnews/build';

server.use('/assets', express.static(`${filepath}/assets`)).use((req, res) => {
  global.host = req.headers.host;
  // eslint-disable-next-line
  const context = {};
  let template = fs.readFileSync(`${filepath}/index.html`).toString();
  const component = (
    <ApolloProvider client={client}>
      <HelmetProvider context={helmetContext}>
        <ServerLocation url={req.url} context={context}>
          <App headers={req.headers} />
        </ServerLocation>
      </HelmetProvider>
    </ApolloProvider>
  );
  renderToStringWithData(component).then(() => {
    const { helmet } = helmetContext;
    const str = ReactDOM.renderToString(component);
    template = template.replace(/__title__/, helmet.title.toString());
    template = template.replace(/__meta__/, helmet.meta.toString());
    template = template.replace(/__link__/, helmet.link.toString());
    template = template.replace(/__content__/, str);
    template = template.replace(/\/\.\.(\/\.)?\/build/g, '');
    res.set('Cache-Control', 'public, max-age=60');
    res.set('ETag', apm_etag(str));
    if (isFresh(req, res)) {
      res.status(304);
      res.send();
      return;
    }
    res.send(template);
    res.status(200);
  });
});
server.set('trust proxy', true);

const httpServer = http.createServer(server).listen(APP_PORT, (error) => {
  if (error) {
    // eslint-disable-next-line
    console.error(error);
  }
  console.log(`🚀 http server started on port ${APP_PORT}`); // eslint-disable-line
});

if (module.hot) {
  // eslint-disable-next-line
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    // console.log("🔁  HMR Reloading `./server`...");
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}

Graceful.on('exit', (done, event, signal) => {
  // eslint-disable-next-line
  console.log(`Received exit signal: ${signal}`);
  httpServer.close(() => {
    // eslint-disable-next-line
    console.log('Closed all connections. Safe to exit');
    done();
  });
});

function isFresh(req, res) {
  return fresh(req.headers, {
    etag: res.getHeader('ETag')
  });
}

function apm_etag(str) {
  let current_etag;
  try {
    const tsfile = fs.readFileSync('../DEPLOY_TIME').toString();
    current_etag = etag(`${str}${tsfile}`);
  } catch (_err) {
    current_etag = etag(str);
  }
  return current_etag;
}
