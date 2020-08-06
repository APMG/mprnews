import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';

const ampStyles = {
  alert: {
    fontFamily: '"Roboto", system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexFlow: 'row nowrap',
    backgroundColor: '#94c4d9',
    borderRadius: '3px',
    color: 'inherit',
    textDecoration: 'none'
  },
  alertPrefix: {
    padding: '8px 12px',
    backgroundColor: '#00334e',
    color: '#ffffff',
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px'
  },
  alertTitle: {
    padding: '8px 12px',
    color: '#00334e'
  },
  hdg: {
    margin: '0',
    fontSize: '1.2rem',
    fontWeight: '700',
    lineHeight: 'normal'
  }
};

const AmpAlert = (props) => {
  return (
    <Link href={props.info.url} style={ampStyles.alert} className="alert">
      {props.info.prefix && (
        <div style={ampStyles.alertPrefix} className="alert_prefix">
          <h2
            style={ampStyles.hdg}
            className="hdg hdg-3"
          >{`${props.info.prefix}`}</h2>
        </div>
      )}
      <div style={ampStyles.alertTitle} className="alert_title">
        <h2 style={ampStyles.hdg} className="hdg hdg-3">
          {`${props.info.title}`}{' '}
        </h2>
      </div>
    </Link>
  );
};

AmpAlert.propTypes = {
  info: PropTypes.shape({
    alert: PropTypes.bool,
    info: PropTypes.shape({
      show_on: PropTypes.object
    }),
    prefix: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string
  })
};

export default AmpAlert;
