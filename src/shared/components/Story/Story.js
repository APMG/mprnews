import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import { Body } from 'amat-react';

const Story = (props) => {
  const { data } = props;
  const { story } = data;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
  return (
    <div>
      {/* <h2>{story.title}</h2> */}
      <Body
        nodeData={JSON.parse(story.body)}
        embedded={JSON.parse(story.embeddedAssetJson)}
      />
    </div>
  );
};
Story.propTypes = {
  data: PropTypes.object
};
export default Story;
