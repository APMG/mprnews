import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Story from '../endpoints/Story/Story';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Story/story.gql';

/* eslint react/display-name: 0 */

const AmpStory = ({ data }) => {
  return <Story data={data} />;
};

AmpStory.getInitialProps = async ({ query: { slug } }) => {
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
  return {
    slug: slug,
    data: data,
    layout: 'amp'
  };
};

AmpStory.propTypes = {
  data: PropTypes.objet
};

export default withAmp(AmpStory, { hybrid: true });
