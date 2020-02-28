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
    case 'story':
      link = `/story/${item.canonicalSlug}`;
      break;
    case 'episode':
      link = `/episode/${item.canonicalSlug}`;
      break;

    default:
      link = `/${item.resourceType}/${item.canonicalSlug}`;
  }
  return link;
};

// Returns either external link or resourceType/slug
exports.linkByTypeHref = (item) => {
  let href;
  switch (item.resourceType) {
    case 'link':
      href = item.destination;
      break;
    case 'collection':
      href = `/[...slug]`;
      break;
    case 'page':
      href = `/[...slug]`;
      break;
    case 'schedule':
      href = `/schedule/[day]`;
      break;
    case 'profile':
      href = `/people/[...slug]`;
      break;
    case 'story':
      href = `/story/[...slug]`;
      break;
    case 'episode':
      href = `/episode/[...slug]`;
      break;
  }
  return href;
};

exports.analyzeUrl = (url) => {
  const regex = /^https:\/\/www.mprnews.org(\/story|\/people|\/episode|\/schedule)?(\/.+)?/i;
  const match = regex.exec(url);
  if (match) {
    const [, specialType, slug] = match;
    let href, as;
    if (specialType && slug) {
      href = specialType === '/schedule' ? `${specialType}/[day]` : `${specialType}/[...slug]`;
      as = `${specialType}${slug}`;
    } else if (specialType) {
      href = `${specialType}`;
      as = `${specialType}`;
    } else if (slug) {
      href = '/[...slug]';
      as = slug;
    } else {
      href = '/';
      as = '/';
    }

    return {
      isInternal: true,
      href: href,
      as: as
    }
  }

  return {
    isInternal: false,
    href: url
  }
};
