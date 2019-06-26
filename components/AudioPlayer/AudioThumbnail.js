import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'apm-mimas';

const AudioThumbnail = (props) => {
  return (
    <Image
      elementClass="audioThumbnail"
      fallbackSrc={props.audioThumbnail}
      alt={props.audioTitle}
    />
  );
};

AudioThumbnail.propTypes = {
  audioTitle: PropTypes.string,
  audioThumbnail: PropTypes.string
};

export default AudioThumbnail;
