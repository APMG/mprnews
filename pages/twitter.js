import React from 'react';
import PropTypes from 'prop-types';

import Twitter from '../endpoints/Twitter/Twitter';

const TwitterPage = ({ slug }) => {
  return <Twitter slug={slug} />;
};

TwitterPage.getInitialProps = async ({ query: slug }) => {
  return { slug: slug };
};

TwitterPage.propTypes = {
  slug: PropTypes.string
};

export default TwitterPage;
