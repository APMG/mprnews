import { closestIndexTo } from 'date-fns';

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
  let inHg = (num / 25.4).toFixed(2);
  return isNaN(inHg) ? '-' : inHg;
}

// Get the previous index OR min
export function prevIndex(i) {
  return i > 1 ? i - 1 : 1;
}

// Get the next index OR max
export function nextIndex(i, count) {
  return i < count ? i + 1 : count;
}

export function collectionLinkData(collection) {
  return collection?.title && collection?.canonicalSlug
    ? {
        tagName: collection.title,
        to: `/${collection.canonicalSlug}`
      }
    : null;
}

// Formats an ugly time (in seconds) to a nice readable format
// e.g. 125 > 2:05, or 4226 > 1:10:26
export function secondsToHms(timeInSeconds) {
  timeInSeconds = Math.round(timeInSeconds);

  var formattedTime = '';
  var formattedMinutes = '';
  var formattedSeconds = '';
  var hours = Math.floor(timeInSeconds / 3600);
  var minutes = Math.floor(timeInSeconds / 60 - hours * 60);
  var seconds = timeInSeconds - minutes * 60 - hours * 3600;

  if (hours !== 0) {
    formattedTime = hours + 'hr ';

    if (minutes < 10) {
      formattedMinutes = '0' + minutes;
    } else {
      formattedMinutes = minutes.toString();
    }
  } else {
    formattedMinutes = minutes.toString();
  }

  if (seconds < 10) {
    formattedSeconds = '0' + seconds;
  } else {
    formattedSeconds = seconds.toString();
  }

  formattedTime =
    formattedTime + formattedMinutes + 'min ' + formattedSeconds + 'sec';

  return formattedTime;
}

// This takes an array of objects with a .validTime attribute, reads in that date, then figures out which of those objects is most recent using a `date-fns` function
export function getValueOfMostRecent(weather, arr) {
  // let currentTime = Date.parse(weather.updateTime);
  // Sometimes weather.updatedTime is several hours old using Date.now() instead
  if (arr.length <= 0) return '-';

  let i = closestIndexTo(
    Date.now(),
    arr.map((i) => Date.parse(i.validTime.split('/').shift()))
  );

  return isNaN(arr[i].value) ? '-' : arr[i].value;
}

export function getClosestHourMatch(arr) {
  let i = closestIndexTo(Date.now(), arr.map((i) => Date.parse(i.endTime)));

  return arr[i];
}
