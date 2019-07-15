// TODO figure out a way to make this work with cjs  and es6
exports.linkByTypeAs = (item) => {
  let link;
  switch (item.resourceType) {
    case 'link':
      link = item.destination;
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
