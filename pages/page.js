import React from 'react';
import PropTypes from 'prop-types';
import Page from '../endpoints/Page/Page';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Page/page.gql';

/* eslint react/display-name: 0 */

const StaticPage = ({ data }) => {
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Page data={data} />
    </ContentGrid>
  );
};

StaticPage.getInitialProps = async ({ query: { slug, previewToken }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, previewToken: previewToken, errorCode };
  }
  const ApolloClient = initApollo();
  let data;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }
  }).then((result) => {
    data = result.data;
  });

  return { slug: slug, previewToken: previewToken, data: data };
};

StaticPage.propTypes = {
  data: PropTypes.object,
};

export default StaticPage;
