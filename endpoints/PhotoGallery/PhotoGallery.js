import React from 'react';
import Error from 'next/error';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import QueryError from '../../components/QueryError/QueryError';
// if good, add MetaTags
import { Loading } from '@apmg/titan';
import { Body } from '@apmg/amat';
import query from './photoGallery.gql';

const PhotoGallery = () => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: 'live-from-here',
      slug: '2019/04/12/test' // point to some real MPR news data?
    }}
    errorPolicy="all"
  >
    {({ loading, error, data }) => {
      if (error) return <QueryError error={error.message} />;
      if (loading) return <Loading />;

      if (data.gallery === null) return <Error statusCode={404} />;

      return <PhotoGalleryInner gallery={data.gallery} />;
    }}
  </Query>
);

const PhotoGalleryInner = ({ gallery }) => {
  return (
    <section className="photoGallery section">
      <Body
        nodeData={JSON.parse(gallery.body)}
        embedded={JSON.parse(gallery.embeddedAssetJson)}
      />
    </section>
  );
};

PhotoGalleryInner.propTypes = {
  gallery: PropTypes.object
};

export default PhotoGallery;
