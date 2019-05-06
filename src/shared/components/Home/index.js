import React from 'react';
import PhotoGalleryWithData from '../PhotoGallery/';
import Sections from '../sections/sections';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home page</h1>
        <Sections />
        <PhotoGalleryWithData />
      </div>
    );
  }
}

export default Home;
