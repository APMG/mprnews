import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';
import { Heading } from '@apmg/titan';

const ICON_SIZE = 75;

const WeekForecast = ({ forecast }) => {
  let dates = new Set(
    forecast.periods.map((period) => format(period.startTime, 'ddd'))
  );

  let buckets = [];
  dates.forEach((date) => {
    if (date === format(new Date(), 'ddd')) return;
    let data = forecast.periods.filter(
      (period) => format(period.startTime, 'ddd') === date
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
          fill="#00334e"
        />
      )
    });
  });

  return (
    <div className="weather_weeklyForecast">
      <Heading level={2} elementClass="weather_chartTitle">
        {'Weekly forecast'}
      </Heading>
      <div className="weather_weeklyChart">
        {buckets.map((bucket, i) => {
          return (
            <div key={i} className="weather_weekday">
              {bucket.icon}
              <div className="weekday_temps">
                <div className="weekday_lo">
                  <span>⬇</span>
                  {`${bucket.lo}`}
                </div>
                <div className="weekday_hi">
                  <span>⬆</span>
                  {`${bucket.hi}`}
                </div>
              </div>
              <div className="weekday_label">
                {`${bucket.date.toUpperCase()}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

WeekForecast.propTypes = {
  forecast: PropTypes.object
};

export default WeekForecast;
