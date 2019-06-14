/* eslint-disable no-console */
/* This is a file that is meant to be run in node every now and then to get an idea of the unique short forecasts that are happening right now. They have no comprehensive list up on their site, but we'll need to connect each of these to an icon somehow. Just run it with the command `node forecastSampling.js`. */

const fetch = require('isomorphic-unfetch');

const addToForecasts = async (coord) => {
  try {
    let pointRes = await fetch(
      `https://api.weather.gov/points/${coord[0]},${coord[1]}`
    );
    let pointData = await pointRes.json();
    let forecastUrl = pointData.properties.forecastHourly;
    let res = await fetch(forecastUrl);
    let data = await res.json();

    let periods = data.properties.periods;
    return periods.map((period) => period.shortForecast);
  } catch (error) {
    console.error(error);
  }
};

const play = async () => {
  const mnCoords = [44.8848, -93.2223];
  const sdCoords = [44.8848, -103.2223];
  const idCoords = [44.8848, -113.2223];
  const orCoords = [44.8848, -123.2223];
  const miCoords = [44.8848, -83.2223];
  const vtCoords = [44.8848, -73.2223];
  const arCoords = [34.8848, -93.2223];
  const laCoords = [28.8848, -93.2223];
  const flCoords = [28.8848, -83.2223];
  const caCoords = [34.8848, -123.2223];

  const testCoords = [
    mnCoords,
    sdCoords,
    idCoords,
    orCoords,
    miCoords,
    vtCoords,
    arCoords,
    laCoords,
    flCoords,
    caCoords
  ];

  let forecasts = [];

  for (let i = 0; i < testCoords.length; i++) {
    let ans = await addToForecasts(testCoords[i]);
    forecasts = forecasts.concat(ans);
  }

  let uniqueForecasts = [...new Set(forecasts)];
  console.log(uniqueForecasts);
};

play();
