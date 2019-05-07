import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import PhotoGalleryWithData from '../PhotoGallery';
import CollectionLinks from '../Collection/CollectionLink';

const Home = (props) => {
  const { data } = props;

  if (data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;

  return (
    <>
      <CollectionLinks />
      <PhotoGalleryWithData />
    </>
  );
};
Home.propTypes = {
  data: PropTypes.object
};

export default Home;
