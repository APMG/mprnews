import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Heading } from '@apmg/titan';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';

const ICON_SIZE = 75;

const WeeklyForecast = ({ forecast }) => {
  let dates = new Set(
    forecast.periods.map((period) => format(new Date(period.startTime), 'iii'))
  );

  let buckets = [];
  dates.forEach((date) => {
    if (date === format(new Date(), 'iii')) return;
    let data = forecast.periods.filter(
      (period) => format(new Date(period.startTime), 'iii') === date
    );

    // get the hi & lo
    let lo = data.reduce(
      (min, b) => Math.min(min, b.temperature),
      data[0].temperature
    );

    let hi = data.reduce(
      (max, b) => Math.max(max, b.temperature),
      data[0].temperature
    );

    // get the icon
    let icons = data.map((point) => point.icon);
    let maxFreq = 1;
    let freq = 0;
    let iconUrl;

    for (let i = 0; i < icons.length; i++) {
      for (let j = i; j < icons.length; j++) {
        if (icons[i] == icons[j]) freq++;
        if (maxFreq < freq) {
          maxFreq = freq;
          iconUrl = icons[i];
        }
      }
      freq = 0;
    }

    buckets.push({
      date: date,
      data: data,
      hi: hi,
      lo: lo,
      icon: (
        <WeatherIcon
          iconUrl={iconUrl}
          width={ICON_SIZE}
          height={ICON_SIZE}
          dayOnly={true}
          fill="#4298b5"
        />
      ),
    });
  });

  return (
    <>
      <Heading level={2} elementClass="weather_chartTitle">
        {'Weekly forecast'}
      </Heading>
      <div className="weather_weeklyForecast">
        <div className="weather_weeklyChart">
          {buckets.map((bucket, i) => {
            return (
              <div key={i} className="weather_weekday">
                <div className="weekday_label">
                  {`${bucket.date.toUpperCase()}`}
                </div>
                {bucket.icon}
                <div className="weekday_temps">
                  <div className="weekday_temp weekday_temp-hi">
                    {bucket.hi}°
                    <span className="weekday_temp weekday_temp-lo">
                      /{bucket.lo}°
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

WeeklyForecast.propTypes = {
  forecast: PropTypes.object,
};

export default WeeklyForecast;
