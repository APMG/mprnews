import fetch from 'isomorphic-unfetch';

export const fetchWeather = async (lat, long) => {
  try {
    const backgroundUrl = `https://api.weather.gov/points/${lat},${long}`;
    const locationRes = await fetch(backgroundUrl);
    const locationData = await locationRes.json();

    const weatherUrl = locationData.properties.forecastGridData;
    const weatherRes = await fetch(weatherUrl);

    const forecastUrl = locationData.properties.forecastHourly;
    const forecastRes = await fetch(forecastUrl);

    const alertUrl = `https://api.weather.gov/alerts/active?point=${lat},${long}`;
    const alertRes = await fetch(alertUrl);

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();
    const alertData = await alertRes.json();

    let {
      updateTime,
      temperature,
      apparentTemperature,
      probabilityOfPrecipitation,
      pressure,
      dewpoint,
      relativeHumidity
    } = weatherData.properties;

    let data = {
      weather: {
        updateTime,
        temperature,
        apparentTemperature,
        probabilityOfPrecipitation,
        pressure,
        dewpoint,
        relativeHumidity
      },
      forecast: forecastData.properties,
      alerts: alertData.features
    };

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
