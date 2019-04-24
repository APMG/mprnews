import React from 'react';
import { graphql } from 'react-apollo';
import Story from './Story';
import { storyQuery } from './StoryQuery';

const StoryWithData = () => {
  const WrappedComponent = graphql(storyQuery('mpr', '2012/03/12/lisaradzak'))(
    Story
  );
  return <WrappedComponent />;
};

export default StoryWithData;
