import App from '../shared/App';
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { HelmetProvider } from 'react-helmet-async';
import { client } from '../shared/graphqlClient';

const Wrapped = () => {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </HelmetProvider>
  );
};

hydrate(<Wrapped />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
