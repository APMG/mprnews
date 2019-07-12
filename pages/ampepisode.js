import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Episode from '../endpoints/Episode/Episode';

/* eslint react/display-name: 0 */

const AmpEpsiode = ({ slug }) => {
  return <Episode slug={slug} />;
};

AmpEpsiode.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug, layout: 'amp' };
};

AmpEpsiode.propTypes = {
  slug: PropTypes.string
};

export default withAmp(AmpEpsiode, { hybrid: true });
