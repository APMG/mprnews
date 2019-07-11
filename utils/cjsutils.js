// TODO figure out a way to make this work with cjs  and es6
exports.linkByTypeAs = (item) => {
  let link;
  switch (item.resourceType) {
    case 'link':
      link = `/${item.destination}`;
      break;
    case 'collection':
      link = `/${item.canonicalSlug}`;
      break;
    case 'page':
      link = `/${item.canonicalSlug}`;
      break;
    case 'profile':
      link = `/people/${item.canonicalSlug}`;
      break;
    default:
      link = `/${item.resourceType}/${item.canonicalSlug}`;
  }
  return link;
};

// Returns either external link or resourceType/slug
exports.linkByTypeHref = (item) => {
  return item.resourceType === 'link'
    ? item.destination
    : `/${item.resourceType}?slug=${item.canonicalSlug}`;
};
exports.fetchRoute = async (query, next) => {
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
