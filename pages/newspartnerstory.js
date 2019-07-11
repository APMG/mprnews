import React from 'react';
import PropTypes from 'prop-types';
import Story from '../endpoints/Story/Story';

const NewspartnerStory = ({ slug }) => {
  return <Story slug={slug} minimal={true} />;
};

NewspartnerStory.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug, layout: 'newspartners' };
};

NewspartnerStory.propTypes = {
  slug: PropTypes.string
};

export default NewspartnerStory;
