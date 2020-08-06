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
        <Heading elementClass="hdg-3 weatherAlert_title" level={2}>
          {alert.properties.event}
        </Heading>
        <Button
          onClick={handleClick}
          aria-haspopup="true"
          aria-expanded={hide ? 'false' : 'true'}
          elementClass={`btn-weatherAlert ${hide ? 'not-active' : 'active'}`}
        >
          <Icon name="chevronDown" elementClass="icon-chevronDown" />
        </Button>
      </div>
      <div className={`weatherAlert_detail ${hide ? 'not-active' : 'active'}`}>
        <Heading level={3}>{`Issued for ${alert.properties.areaDesc.replace(
          ';',
          ' &'
        )} at ${format(
          new Date(alert.properties.effective),
          'M/d/yyyy @ H:mm a'
        )} until ${format(
          new Date(alert.properties.ends),
          'M/d/yyyy @ H:mm a'
        )}`}</Heading>
        <p>{alert.properties.description}</p>
        {alert.properties.instruction && (
          <div className="weatherAlert_instructions">
            <Heading level={4}>INSTRUCTIONS</Heading>
          </div>
        )}
        {alert.properties.instruction && <p>{alert.properties.instruction}</p>}
      </div>
    </div>
  );
};

WeatherAlert.propTypes = {
  alert: PropTypes.object,
};

export default WeatherAlert;
