import React from 'react';
import PropTypes from 'prop-types';

const ampStyles = {
  figure: {
    margin: '0 0 1em',
    fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
    fontSize: '.85em'
  },
  figcaption: {
    padding: '0.25em 1em 0'
  },
  audio: {
    height: '42px',
    width: '100%',
    minWidth: '300px'
  }
};

const AmpAudioPlayButton = ({ audioSource, audioTitle, audioSubtitle }) => {
  return (
    <figure style={ampStyles.figure}>
      <amp-audio
        height="42"
        width="auto"
        layout="fixed-height"
        src={audioSource}
      ></amp-audio>
      <figcaption className="figure_caption" style={ampStyles.figcaption}>
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
