import React from 'react';
import { graphql } from 'react-apollo';
import Twitter from './Twitter';
import PropTypes from 'prop-types';
import { twitterQuery } from './TwitterQuery';

const TwitterWithData = (props) => {
  const twitterSlug = props['*'];
  const WrappedComponent = graphql(twitterQuery('mpr', twitterSlug))(Twitter);
  return <WrappedComponent />;
};

TwitterWithData.propTypes = {
  '*': PropTypes.string
};

export default TwitterWithData;
