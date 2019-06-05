import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const createClient = () => {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: process.env.URL_ENV,
      fetch: fetch
    }),
    cache: new InMemoryCache()
  });
};
