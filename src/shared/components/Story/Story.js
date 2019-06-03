import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import Content from '../Content/Content';

const Story = (props) => {
  const { data } = props;
  const { story } = data;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
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
  data: PropTypes.object
};

export default Story;
