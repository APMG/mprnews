import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';

const Event = (props) => {
  return (
    <section className="event section">
      <Heading level={2}>{`${props.path} page`}</Heading>
    </section>
  );
};

Event.propTypes = {
  path: PropTypes.string,
};

export default Event;
