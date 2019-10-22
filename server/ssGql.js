const ssGql = async (query, next) => {
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
        next();
      }
      return response.json();
    })
    .then((response) => {
      const content = response.data.content;
      if (!content) {
        return next();
      }
      return response.data.content;
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.error('Error:', error);
    });
};

export default ssGql;
