import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Heading } from 'apm-titan';

const Twitter = (props) => {
  const { data } = props;
  const { twitter } = data;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
  return (
    <article className="twitter">
      <Heading level={2}>LISTEN: {twitter.title}</Heading>
    </article>
  );
};

Twitter.propTypes = {
  data: PropTypes.object
};

export default Twitter;
