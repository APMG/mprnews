import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayerContext from '../../context/AudioPlayerContext';
import Icon from '../Icons/Icon';

const AudioListenLiveButton = (props) => {
  let audioSource = JSON.stringify([
    {
      url: 'https://nis.stream.publicradio.org/nis.aac',
      type: 'audio/aac'
    },
    {
      url: 'https://nis.stream.publicradio.org/nis.mp3',
      type: 'audio/mpeg'
    }
  ]);
  let audioTitle = 'MPR News';
  let audioSubtitle = '';

  return (
    <AudioPlayerContext.Consumer>
      {(context) => (
        <>
          <button
            className="player_listenLive"
            onClick={(e) => {
              e.preventDefault();
              context.handleAudioButtonClick(
                audioSource,
                audioTitle,
                audioSubtitle
              );
            }}
          >
            <Icon name="headphones" />
            Listen Live
          </button>
          <button className="player_expand">
            <Icon name="chevronDown" />
            Expand
          </button>
        </>
      )}
    </AudioPlayerContext.Consumer>
  );
};

AudioListenLiveButton.propTypes = {
  audioSource: PropTypes.string,
  audioSubtitle: PropTypes.string,
  audioTitle: PropTypes.string
};

export default AudioListenLiveButton;
