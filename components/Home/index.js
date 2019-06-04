import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Heading } from 'apm-titan';
import { Body } from 'amat-react';
import query from './home.gql';

const Home = () => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: 'mprnews',
      slug:
        '2019/06/03/npr-sudan-security-forces-open-fire-on-protesters-in-capital'
    }}
  >
    {({ loading, error, data: { story } }) => {
      if (error) return <div>Error loading page data</div>;
      if (loading) return <div>Loading</div>;

      return <HomeInner story={story} />;
    }}
  </Query>
);

const HomeInner = ({ story }) => {
  return (
    <>
      <Heading level={1}>{story.title}</Heading>
      <Body
        nodeData={JSON.parse(story.body)}
        embedded={JSON.parse(story.embeddedAssetJson)}
      />
    </>
  );
};

HomeInner.propTypes = {
  story: PropTypes.object
};

export default Home;
