import React from 'react';
import { graphql } from 'react-apollo';
import PhotoGallery from './PhotoGallery';
import { photogalleryQuery } from './PhotoGalleryQuery';
import PropTypes from 'prop-types';

const PhotoGalleryWithData = () => {
  const WrappedComponent = graphql(photogalleryQuery())(PhotoGallery);
  return (
    <>
      <WrappedComponent />
    </>
  );
};

PhotoGallery.propTypes = {
  '*': PropTypes.string
};

export default PhotoGalleryWithData;
