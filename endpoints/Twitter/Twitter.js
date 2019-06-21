import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Heading, Loading } from '@apmg/titan';
import query from './twitter.gql';

const Twitter = ({ slug }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>{`Error: ${error}`}</div>;
      if (loading) return <Loading />;

      return <TwitterInner twitter={data.twitter} />;
    }}
  </Query>
);

const TwitterInner = ({ twitter, slug }) => {
  return (
    <div className="twitter">
      {console.log('twitter', twitter)}
      {console.log('slug', slug)}
      <Heading level={2}>LISTEN: {twitter.title}</Heading>
    </div>
  );
};

TwitterInner.propTypes = {
  twitter: PropTypes.object,
  slug: PropTypes.string
};

Twitter.propTypes = {
  slug: PropTypes.string
};

export default Twitter;
