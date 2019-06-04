import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './story.gql';
import Content from '../../components/Content/Content';
import { withRouter } from 'next/router';

const Story = withRouter((props) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: 'mprnews',
      slug: props.router.query.slug
    }}
  >
    {({ loading, error, data: { story } }) => {
      if (error) return <div>Error loading page data</div>;
      if (loading) return <div>Loading</div>;

      return <StoryInner story={story} />;
    }}
  </Query>
));

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
