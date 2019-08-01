import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Page from '../endpoints/Page/Page';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Page/page.gql';

/* eslint react/display-name: 0 */

const AmpPage = ({ data }) => {
  return <Page data={data} />;
};

AmpPage.getInitialProps = async ({ query: { slug } }) => {
  const ApolloClient = initApollo();
  let data;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
    }
  }).then((result) => {
    data = result.data;
  });

  return { data: data, layout: 'amp' };
};

AmpPage.propTypes = {
  data: PropTypes.object
};

export default withAmp(AmpPage, { hybrid: true });
