import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Heading, Loading } from '@apmg/titan';
import { Body } from 'amat-react';
import query from './episode.gql';

const Episode = ({ slug, previewToken }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>Error loading page data</div>;
      if (loading) return <Loading />;

      return <EpisodeInner episode={data.episode} />;
    }}
  </Query>
);

const EpisodeInner = ({ episode }) => (
  <article className="episode">
    <Heading level={2}>{episode.title}</Heading>
    <Body
      nodeData={JSON.parse(episode.body)}
      embedded={JSON.parse(episode.embeddedAssetJson)}
    />
  </article>
);

Episode.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

EpisodeInner.propTypes = {
  episode: PropTypes.object
};

export default Episode;
