import fetch from 'isomorphic-unfetch';

export const fetchWeather = async (lat, long) => {
  const backgroundUrl = `https://api.weather.gov/points/${lat},${long}`;
  const locationRes = await fetch(backgroundUrl);
  const locationData = await locationRes.json();

  const weatherUrl = locationData.properties.forecastGridData;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  const forecastUrl = locationData.properties.forecast;
  const forecastRes = await fetch(forecastUrl);
  const forecastData = await forecastRes.json();

  const alertUrl = `https://api.weather.gov/alerts/active?point=${lat},${long}`;
  const alertRes = await fetch(alertUrl);
  const alertData = await alertRes.json();

  let {
    updateTime,
    temperature,
    apparentTemperature,
    windDirection,
    windSpeed,
    pressure,
    dewpoint,
    relativeHumidity
  } = weatherData.properties;

  return {
    weather: {
      updateTime,
      temperature,
      apparentTemperature,
      windDirection,
      windSpeed,
      pressure,
      dewpoint,
      relativeHumidity
    },
    forecast: forecastData.properties,
    alerts: alertData.features
  };
};
