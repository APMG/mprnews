import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import Content from '../../components/Content';
import query from './story.gql';

const Story = ({ slug }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: 'mprnews',
      slug: slug
    }}
  >
    {({ loading, error, data: { story } }) => {
      if (error) return <div>Error loading story</div>;
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

Story.propTypes = {
  slug: PropTypes.string
};

StoryInner.propTypes = {
  story: PropTypes.object
};

export default Story;
