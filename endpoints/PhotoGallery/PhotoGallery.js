import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from '@apmg/titan';
import { Body } from '@apmg/amat';
import query from './photoGallery.gql';

const PhotoGallery = () => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: 'live-from-here',
      slug: '2019/04/12/test'
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>{`Error: ${error}`}</div>;
      if (loading) return <Loading />;

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
