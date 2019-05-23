import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Story from './Story';
import PropTypes from 'prop-types';
import { storyQuery } from './StoryQuery';
import SiteConfigContext from '../../context/SiteConfigContext';

const StoryWithData = (props) => {
  const context = useContext(SiteConfigContext);
  const storySlug = props['*'];
  const WrappedComponent = graphql(storyQuery(context.slug, storySlug))(Story);
  return <WrappedComponent />;
};

StoryWithData.propTypes = {
  '*': PropTypes.string
};

export default StoryWithData;
