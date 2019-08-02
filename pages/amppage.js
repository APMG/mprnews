import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { withAmp } from 'next/amp';
import Page from '../endpoints/Page/Page';

/* eslint react/display-name: 0 */

const AmpPage = ({ slug, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Page slug={slug} />;
};

AmpPage.getInitialProps = async ({ query: { slug }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, layout: 'amp', errorCode };
  }

  return { slug: slug, layout: 'amp' };
};

AmpPage.propTypes = {
  slug: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default withAmp(AmpPage, { hybrid: true });
