import React from 'react';
import PropTypes from 'prop-types';
import TwitterLayout from '../layouts/TwitterLayout';
import Twitter from '../endpoints/Twitter/Twitter';

const TwitterPage = ({ slug }) => {
  return (
    <TwitterLayout>
      <Twitter slug={slug} />
    </TwitterLayout>
  );
};

TwitterPage.getInitialProps = async ({ query: slug }) => {
  // return { slug: `2018/01/31/fact-check-trumps-state-of-the-union-address` };
  return { slug: slug };
};

TwitterPage.propTypes = {
  slug: PropTypes.string
};

export default TwitterPage;
