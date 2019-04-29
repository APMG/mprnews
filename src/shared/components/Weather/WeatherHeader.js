import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RestApiHooksComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.weather.gov/points/44.8848,-93.2223/forecast`)
      .then((result) => setData(result.data));
  }, []);

  return data.properties ? (
    <div>
      {console.log(data)}
      <a
        href={`/weather/${data.geometry.geometries[0].coordinates[0]},${
          data.geometry.geometries[0].coordinates[1]
        }`}
      >
        <h1>{data.properties.periods[0].temperature}°</h1>
      </a>
    </div>
  ) : (
    <div>Loading......</div>
  );
}
