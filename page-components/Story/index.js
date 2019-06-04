import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import Content from '../../components/Content';
import query from './story.gql';

const Story = () => (
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
      if (loading) return <Loading />;

      return <StoryInner story={story} />;
    }}
  </Query>
);

const StoryInner = ({ story }) => {
  return (
    <article className="story">
      <Content
        title={story.title}
        body={story.body}
        embeddedAssetJson={story.embeddedAssetJson}
      />
    </article>
  );
};

StoryInner.propTypes = {
  story: PropTypes.object
};

export default Story;
