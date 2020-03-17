import React from 'react';
import PropTypes from 'prop-types';

const ampStyles = {
  figure: { margin: '0' }
};

const AmpAudioPlayButton = ({ audioSource, audioTitle, audioSubtitle }) => {
  return (
    <figure style={ampStyles.figure}>
      <amp-audio width="300" height="42" src={audioSource}></amp-audio>
      <figcaption className="figure_caption">
        <div className="figure_caption_content">{audioTitle}</div>
        <span className="figure_credit">{audioSubtitle}</span>
      </figcaption>
    </figure>
  );
};

AmpAudioPlayButton.propTypes = {
  audioSource: PropTypes.string,
  audioSubtitle: PropTypes.string,
  audioTitle: PropTypes.string
};

export default AmpAudioPlayButton;
