import React from 'react';
import PropTypes from 'prop-types';
import Story from '../endpoints/Story/Story';

const NewspartnerStory = ({ slug, isNewsPartners }) => {
  return <Story slug={slug} minimal={true} isNewsPartners={isNewsPartners} />;
};

NewspartnerStory.getInitialProps = async ({
  query: { slug, isNewsPartners }
}) => {
  return { slug: slug, isNewsPartners: isNewsPartners, layout: 'newspartners' };
};

NewspartnerStory.propTypes = {
  slug: PropTypes.string,
  isNewsPartners: PropTypes.bool
};

export default NewspartnerStory;
