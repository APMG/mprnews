import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Episode from './Episode';
import PropTypes from 'prop-types';
import { episodeQuery } from './EpisodeQuery';
import SiteConfigContext from '../../context/SiteConfigContext';

const EpisodeWithData = (props) => {
  const context = useContext(SiteConfigContext);
  const episodeSlug = props['*'];
  const WrappedComponent = graphql(episodeQuery(context.slug, episodeSlug))(
    Episode
  );
  return <WrappedComponent />;
};

EpisodeWithData.propTypes = {
  '*': PropTypes.string
};

export default EpisodeWithData;
