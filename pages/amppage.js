import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import App from '../components/App';
import Page from '../endpoints/Page';

/* eslint react/display-name: 0 */

const AmpPage = withAmp((props) => {
  return (
    <App>
      <Page slug={props.slug} />
    </App>
  );
});

AmpPage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

AmpPage.propTypes = {
  slug: PropTypes.string
};

export default AmpPage;
