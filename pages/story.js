import React from 'react';
import PropTypes from 'prop-types';
import Main from '../layouts/Main';
import Story from '../endpoints/Story';

const StoryPage = (props) => (
  <Main>
    <Story slug={props.slug} />
  </Main>
);

StoryPage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

StoryPage.propTypes = {
  slug: PropTypes.string
};

export default StoryPage;
