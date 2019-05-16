import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentPosition } from '../utils';

export default function weatherHeaderRequest() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `47.9032,-91.8671`;
    axios
      .get(`https://api.weather.gov/points/${url}/forecast`)
      .then((result) => setData(result.data));
  }, []);

  const fetchCoordinates = async () => {
    try {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;
      axios
        .get(`https://api.weather.gov/points/${latitude},${longitude}/forecast`)
        .then((result) => setData(result.data));
    } catch (error) {
      error;
    }
  };

  return data.properties ? (
    <div>
      <a
        href={`/weather/${data.geometry.geometries[0].coordinates[1]},${
          data.geometry.geometries[0].coordinates[0]
        }`}
      >
        <h1>{data.properties.periods[0].temperature}°</h1>
        {data.properties.periods[0].shortForecast}
      </a>
      <br />
      <button type="button" onClick={fetchCoordinates}>
        Get Geolocation
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
