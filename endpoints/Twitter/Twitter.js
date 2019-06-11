import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Heading, Loading } from '@apmg/titan';
import query from './twitter.gql';

const Twitter = () => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: 'live-from-here',
      slug: '2019/04/12/test'
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>{`Error: ${error}`}</div>;
      if (loading) return <Loading />;

      return <TwitterInner twitter={data.twitter} />;
    }}
  </Query>
);

const TwitterInner = ({ twitter }) => {
  return (
    <div className="twitter">
      <Heading level={2}>LISTEN: {twitter.title}</Heading>
    </div>
  );
};

TwitterInner.propTypes = {
  twitter: PropTypes.object
};

export default Twitter;
