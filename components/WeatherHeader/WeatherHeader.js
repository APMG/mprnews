import React, { useEffect, useState } from 'react';
import { Loading } from '@apmg/titan';
import Icon from '../Icons/Icon';
import axios from 'axios'; // TODO: switch to isomorphic-unfetch to better stick with Next.js standards (and because it's way smaller). Also, we literally need this one for the Next/Apollo setup, and it's bad form to import two libraries for roughly the same thing.
import { getCurrentPosition } from '../../utils/utils';

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
        .then((result) => {
          setData(result.data);
        });
    } catch (error) {
      error;
    }
  };

  return (
    <div className="weatherHeader">
      {data.properties ? (
        <>
          <a
            href={`/weather/${data.geometry.geometries[0].coordinates[1]},${
              data.geometry.geometries[0].coordinates[0]
            }`}
          >
            <div className="weatherHeader_temp">
              {data.properties.periods[0].temperature}°{' '}
            </div>
            <div className="weatherHeader_text invisible">
              {data.properties.periods[0].shortForecast}
            </div>
          </a>
          <button
            className="weatherButton"
            type="button"
            onClick={fetchCoordinates}
          >
            <Icon elementClass="icon-weatherHeader" name="location" />
            <div className="invisible">Get Geolocation</div>
            <div className="weatherHeader_default">MSP</div>
          </button>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
