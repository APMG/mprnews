import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Episode from './Episode';
import { episodePreviewQuery } from './EpisodePreviewQuery';
import PropTypes from 'prop-types';
import SiteConfigContext from '../../context/SiteConfigContext';

const EpisodePreviewWithData = (props) => {
  const context = useContext(SiteConfigContext);
  const ClientAndServerLocation = props.location.pathname.match(/\?/g)
    ? props.location.pathname
    : window.location.pathname + window.location.search;
  const [curPath, qs] = ClientAndServerLocation.split('?');
  const token = new URLSearchParams(qs).get('token');
  const episodeSlug = curPath.replace(/\/preview\/episodes\//, '');
  const qry = episodePreviewQuery(context.slug, episodeSlug, token);
  const WrappedComponent = graphql(qry)(Episode);

  return <WrappedComponent />;
};

EpisodePreviewWithData.propTypes = {
  location: PropTypes.object
};

export default EpisodePreviewWithData;
