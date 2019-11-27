export const Gql = async (query, next) => {
  const fetch = require('isomorphic-unfetch');
  return await fetch(process.env.GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: query
  })
    .then((response) => {
      if (!response.ok) {
      }
      return response.json();
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.error('Error:', error);
    });
};
