export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

// source: https://www.google.com/search?q=celcius+to+fahrenheit&oq=celcius+to+fah&aqs=chrome.0.69i59j0j69i57j0l3.3138j0j9&sourceid=chrome&ie=UTF-8
export function CtoF(temp) {
  return Math.round(temp * (9 / 5) + 32);
}

// source: https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words/7490772#7490772
export function degToCompass(num) {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
  ];
  return arr[val % 16];
}

// source: https://www.google.com/search?q=meters+per+second+to+miles+per+hour&oq=meters+per+second+to+miles+per+hour&aqs=chrome..69i57j6j0l4.5259j0j4&sourceid=chrome&ie=UTF-8
export function mpsToMph(num) {
  return Math.round(num * 2.237);
}

// source: https://www.google.com/search?ei=HyMBXcUv0LC2BY_okfAL&q=torr+to+inhg&oq=torr+to+inhg&gs_l=psy-ab.3..0i20i263j0l2j0i22i30l7.3328.5353..5665...1.0..0.147.583.7j1......0....1..gws-wiz.......0i71j0i67.N0l305HdQhU
export function torrToInhg(num) {
  return (num / 25.4).toFixed(2);
}

// Get the previous index OR min
export function prevIndex(i) {
  return i > 1 ? i - 1 : 1;
}

// Get the next index OR max
export function nextIndex(i, count) {
  return i < count ? i + 1 : count;
}

// Returns resourceType and if collection return as topic
export function resourceType(item) {
  let resource;

  switch (item.resourceType) {
    case 'story':
      resource = 'story';
      break;
    case 'episode':
      resource = 'episode';
      break;
    case 'collection':
      resource = 'topic';
      break;
    default:
      resource = item.resourceType;
  }
  return resource;
}

// Returns either external link or resourceType/slug
export function linkByTypeHref(item) {
  const type = resourceType(item);
  return item.resourceType === 'link'
    ? item.destination
    : `/${type}?slug=${item.canonicalSlug}
`;
}

// Returns either external link or resourceType/slug
export function linkByTypeAs(item) {
  const type = resourceType(item);
  return item.resourceType === 'link'
    ? item.destination
    : `/${type}/${item.canonicalSlug}
      `;
}
