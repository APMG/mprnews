import React from 'react';
import ReactDOM from 'react-dom/server';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { HelmetProvider } from 'react-helmet-async';
import { ServerLocation } from 'apm-titan';
import { client } from '../shared/graphql/graphqlClient';
import App from '../shared/App';
import fs from 'fs';
import os from 'os';
import {
  globalHostFunc,
  replaceTemplateStrings,
  isFresh,
  apm_etag
} from './utils';

export default function ReactAppSsr(app) {
  app.use((req, res) => {
    const helmetContext = {};
    const filepath =
      process.env.APP_PATH === 'relative' ? 'build' : 'current/build';

    const forwarded = globalHostFunc(req).split(':')[0];
    const hostname = os.hostname();

    const context = {};

    let graphqlEnv = hostname.match(/dev/) ? '-dev' : '';
    graphqlEnv = process.env.NODE_ENV === 'development' ? '-dev' : graphqlEnv;
    const graphqlClient = client(graphqlEnv);
    let template = fs.readFileSync(`${filepath}/index.html`).toString();
    const component = (
      <ApolloProvider client={graphqlClient}>
        <HelmetProvider context={helmetContext}>
          <ServerLocation url={req.url} context={context}>
            <App forward={forwarded} />
          </ServerLocation>
        </HelmetProvider>
      </ApolloProvider>
    );
    renderToStringWithData(component).then(() => {
      const { helmet } = helmetContext;
      let str = ReactDOM.renderToString(component);
      const is404 = str.match(/Not Found\. 404/);
      if (is404?.length > 0) {
        str = 'Not Found 404.';
        template = replaceTemplateStrings(template, '', '', '', '');
        res.status(404);
        res.send(template);
        return;
      }
      template = replaceTemplateStrings(
        template,
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        str
      );
      res.set('Cache-Control', 'public, max-age=120');
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
}
