import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Story from './Story';
import { StoryPreviewQuery } from './StoryPreviewQuery';
import PropTypes from 'prop-types';
import SiteConfigContext from '../../context/SiteConfigContext';

const StoryPreviewWithData = (props) => {
  const context = useContext(SiteConfigContext);
  console.log('props', props.location.pathname);
  // console.log('window', window.location.pathname);
  const ClientAndServerLocation = props.location.pathname.match(/\?/g);
  // ? props.location.pathname
  // : window.location.pathname + window.location.search;
  const [curPath, qs] = ClientAndServerLocation.split('?');
  const token = new URLSearchParams(qs).get('token');
  const storySlug = curPath.replace(/\/preview\/stories\//, '');
  const WrappedComponent = graphql(
    StoryPreviewQuery(context.slug, storySlug, token)
  )(Story);

  return <WrappedComponent />;
};

StoryPreviewWithData.propTypes = {
  location: PropTypes.object
};

export default StoryPreviewWithData;
