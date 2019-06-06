import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './episode.gql';
import Content from '../../components/Content';

const Episode = () => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug:
        '2019/05/28/simple-episode-do-voting-laws-keep-people-of-color-from-the-polls'
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>Error loading page data</div>;
      if (loading) return <div>Loading</div>;

      return <EpisodeInner episode={data.episode} />;
    }}
  </Query>
);

const EpisodeInner = ({ episode }) => {
  return (
    <article className="story">
      <Content
        title={episode.title}
        body={episode.body}
        embeddedAssetJson={episode.embeddedAssetJson}
      />
    </article>
  );
};

EpisodeInner.propTypes = {
  episode: PropTypes.object
};

export default Episode;
