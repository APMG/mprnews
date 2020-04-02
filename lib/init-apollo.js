import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import fragmentMatcher from './fragmentMatcher';
const https = require('https');
const agent = new https.Agent({ keepAlive: true });

let apolloClient = null;

function createApolloClientInstance(initialState, uri) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    fragmentMatcher: fragmentMatcher
  };
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: uri || process.env.GRAPHQL_API, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      // Use fetch() polyfill on the server
      fetch: !process.browser && fetch,
      fetchOptions: { agent: agent }
    }),
    cache: new InMemoryCache(defaultOptions).restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createApolloClientInstance(
      initialState,
      process.env.PRIVATE_GRAPHQL_API
    );
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClientInstance(initialState);
  }

  return apolloClient;
}
