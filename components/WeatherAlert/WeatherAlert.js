import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Heading, Button } from '@apmg/titan';
import Icon from '../Icons/Icon';

const WeatherAlert = ({ alert }) => {
  const [hide, setHide] = useState(true);

  const handleClick = () => {
    setHide(!hide);
  };

  return (
    <div className="weatherAlert">
      <div className="weatherAlert_main">
        <Heading elementClass="weatherAlert_title" level={2}>
          {alert.properties.event}
        </Heading>
        <Button onClick={handleClick} elementClass="btn-weatherAlert">
          <Icon name="chevronDown" />
        </Button>
      </div>
      <div className={`weatherAlert_detail ${hide ? 'hide' : ''}`}>
        {/* <Heading level={3}>{alert.properties.headline}</Heading> */}
        <Heading level={3}>{`Issued for ${alert.properties.areaDesc.replace(
          ';',
          ' &'
        )} at ${format(
          alert.properties.effective,
          'M/D/YYYY @ H:mm A'
        )} until ${format(
          alert.properties.ends,
          'M/D/YYYY @ H:mm A'
        )}`}</Heading>
        <p>{alert.properties.description}</p>
        <Heading level={4}>INSTRUCTIONS</Heading>
        <p>{alert.properties.instruction}</p>
      </div>
    </div>
  );
};

WeatherAlert.propTypes = {
  alert: PropTypes.object
};

export default WeatherAlert;
