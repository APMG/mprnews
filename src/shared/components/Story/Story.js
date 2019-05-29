import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Heading } from 'apm-titan';
import { Body } from 'amat-react';

const Story = (props) => {
  const { data } = props;
  const { story } = data;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
  return (
    <article className="story">
      <Heading level={1} className="hdg hdg-1">
        {story.title}
      </Heading>
      <Body
        nodeData={JSON.parse(story.body)}
        embedded={JSON.parse(story.embeddedAssetJson)}
      />
    </article>
  );
};

Story.propTypes = {
  data: PropTypes.object
};

export default Story;
