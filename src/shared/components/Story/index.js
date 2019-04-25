import React from 'react';
import { graphql } from 'react-apollo';
import Story from './Story';
import PropTypes from 'prop-types';
import { storyQuery } from './StoryQuery';

const StoryWithData = (props) => {
  const storySlug = props['*'];
  const WrappedComponent = graphql(storyQuery('mpr', storySlug))(Story);
  return <WrappedComponent />;
};

StoryWithData.propTypes = {
  '*': PropTypes.string
};

export default StoryWithData;
