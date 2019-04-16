import React from 'react';
import { graphql } from 'react-apollo';
import PhotoGallery from './PhotoGallery';
import { photogalleryQuery } from './PhotoGalleryQuery';
import PropTypes from 'prop-types';

class PhotoGalleryWithData extends React.Component {
  render() {
    let WrappedComponent = '';
    return (
      <>
        {
          (WrappedComponent = graphql(
            photogalleryQuery('live-from-here', '2019/04/12/test')
          )(PhotoGallery))
        }
        <WrappedComponent />
      </>
    );
  }
}

PhotoGallery.propTypes = {
  '*': PropTypes.string
};

export default PhotoGalleryWithData;
