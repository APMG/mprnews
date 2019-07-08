import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@apmg/mimas';

const AudioPlayerThumbnail = (props) => {
  return (
    <Image
      elementClass="audioThumbnail"
      fallbackSrc={props.audioThumbnail}
      alt={props.audioTitle}
    />
  );
};

AudioPlayerThumbnail.propTypes = {
  audioTitle: PropTypes.string,
  audioThumbnail: PropTypes.string
};

export default AudioPlayerThumbnail;
