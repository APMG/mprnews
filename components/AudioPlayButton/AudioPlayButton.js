import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayerContext from '../../context/AudioPlayerContext';
import classNames from 'classnames';
import Icon from '../Icons/Icon';

const AudioPlayButton = (props) => {
  const classes = classNames({
    playButton: true,
    [props.elementClass]: props.elementClass
  });

  let audioSource = props.audioSource;
  let audioTitle = props.audioTitle;
  let audioSubtitle = props.audioSubtitle;

  const buttonInner = (context) => {
    if (context.isAudioPlaying && audioSource === context.audioSource) {
      return (
        <>
          <Icon name="pause" />
          {!props.label && <span className="invisible">Pause</span>}
        </>
      );
    } else {
      return (
        <>
          <Icon name="play" />
          {!props.label && <span className="invisible">Play</span>}
        </>
      );
    }
  };

  const style = () => {
    if (props.size) {
      return { height: props.size, width: props.size };
    }
  };

  return (
    <AudioPlayerContext.Consumer>
      {(context) => (
        <button
          type="button"
          className={classes}
          onClick={(e) => {
            e.preventDefault;
            context.handleAudioButtonClick(
              audioSource,
              audioTitle,
              audioSubtitle
            );
          }}
        >
          <span className="playButton_button" style={style()}>
            {buttonInner(context)}
          </span>
          {props.label && (
            <span className="playButton_label">
              {context.isAudioPlaying ? 'Pause' : 'Play'} {props.label}
            </span>
          )}
        </button>
      )}
    </AudioPlayerContext.Consumer>
  );
};

AudioPlayButton.propTypes = {
  audioSource: PropTypes.string,
  audioSubtitle: PropTypes.string,
  audioTitle: PropTypes.string,
  elementClass: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string
};

export default AudioPlayButton;
