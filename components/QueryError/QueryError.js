import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';

const QueryError = ({ error }) => {
  console.error(error);

  return (
    <div className="queryError">
      <Heading level={2}>Error: ${error}</Heading>
    </div>
  );
};

QueryError.propTypes = {
  error: PropTypes.string
};

export default QueryError;
