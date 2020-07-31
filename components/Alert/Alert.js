import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';

const Alert = (props) => {
  return (
    <Link href={props.info.url} className="alert">
      {props.info.prefix && (
        <div className="alert_prefix">
          <h2 className="hdg hdg-3">{`${props.info.prefix}`}</h2>
        </div>
      )}
      <div className="alert_title">
        <h2 className="hdg hdg-3">{`${props.info.title}`} </h2>
      </div>
    </Link>
  );
};

Alert.propTypes = {
  info: PropTypes.shape({
    alert: PropTypes.bool,
    info: PropTypes.shape({
      show_on: PropTypes.object,
    }),
    prefix: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default Alert;
