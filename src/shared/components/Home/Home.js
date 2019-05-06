import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import Sections from '../sections/sections';
import PhotoGalleryWithData from '../PhotoGallery';

const Home = (props) => {
  const { data } = props;

  if (data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;

  return (
    <>
      <Sections />
      <PhotoGalleryWithData />
    </>
  );
};
Home.propTypes = {
  data: PropTypes.object
};

export default Home;
