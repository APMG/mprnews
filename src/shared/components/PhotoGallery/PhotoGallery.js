import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import { Body } from 'amat-react';

const PhotoGallery = (props) => {
  const { data } = props;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;

  const { episode } = data;
  const body = JSON.parse(episode.body);

  return (
    <div className="photogallery">
      Photo Gallery
      <p>
        <Body
          nodeData={body}
          embedded={JSON.parse(episode.embeddedAssetJson)}
        />
      </p>
    </div>
  );
};
PhotoGallery.propTypes = {
  data: PropTypes.object
};
export default PhotoGallery;
