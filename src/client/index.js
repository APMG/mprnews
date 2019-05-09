import App from '../shared/App';
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { HelmetProvider } from 'react-helmet-async';
import { client } from '../shared/graphql/graphqlClient';

const graphqlEnv = window.location.href.match(/local|dev/) ? '-dev' : '';

const graphqlClient = client(graphqlEnv);

const Wrapped = () => {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <ApolloProvider client={graphqlClient}>
        <App />
      </ApolloProvider>
    </HelmetProvider>
  );
};

hydrate(<Wrapped />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
