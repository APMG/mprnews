import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App';
import Story from '../endpoints/Story';

const StoryPage = (props) => (
  <App>
    <Story slug={props.slug} />
  </App>
);

StoryPage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

StoryPage.propTypes = {
  slug: PropTypes.string
};

export default StoryPage;
