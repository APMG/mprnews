import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'https://cmsproxy-dev.publicradio.org/api/v1/graphql',
    fetch: fetch
  }),
  cache: new InMemoryCache()
});
