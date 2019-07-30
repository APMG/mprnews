import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import { withAmp } from 'next/amp';
import Episode from '../endpoints/Episode/Episode';

/* eslint react/display-name: 0 */

const AmpEpisode = ({ slug, errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
  return <Episode slug={slug} />;
};

AmpEpisode.getInitialProps = async ({ query: { slug }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, layout: 'amp', errorCode };
  }

  return { slug: slug, layout: 'amp' };
};

AmpEpisode.propTypes = {
  slug: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default withAmp(AmpEpisode, { hybrid: true });
