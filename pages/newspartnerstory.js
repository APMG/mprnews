import React from 'react';
import PropTypes from 'prop-types';
import Story from '../endpoints/Story/Story';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Story/story.gql';

const NewspartnerStory = ({ data }) => {
  return <Story data={data} minimal={true} />;
};

NewspartnerStory.getInitialProps = async ({ query: { slug } }) => {
  const ApolloClient = initApollo();
  let data;
  // const query = storyQuery(slug, previewToken ? previewToken : null);
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
    }
  }).then((result) => {
    data = result;
  });
  return {
    data: data.data,
    layout: 'newspartners'
  };
};

NewspartnerStory.propTypes = {
  data: PropTypes.object
};

export default NewspartnerStory;
