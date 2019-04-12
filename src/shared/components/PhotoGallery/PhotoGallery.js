import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
// import { Image } from 'apm-mimas';
import { Body } from 'amat-react';

class PhotoGallery extends React.Component {
  render() {
    const { data } = this.props;
    const { episode } = data;

    if (data.loading) return <Loading />;
    if (data.error) return <div>Error</div>;

    const body = JSON.parse(episode.body);

    return (
      <div className="photogallery">
        Photo Gallery
        <p>
          <Body nodeData={body} />
        </p>
      </div>
    );
  }
}
PhotoGallery.propTypes = {
  data: PropTypes.object
};
export default PhotoGallery;
