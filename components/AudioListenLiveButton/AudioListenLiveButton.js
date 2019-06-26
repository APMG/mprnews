import React, { useContext } from 'react';
import AudioPlayerContext from '../../context/AudioPlayerContext';
import Icon from '../Icons/Icon';

const AudioListenLiveButton = () => {
  const context = useContext(AudioPlayerContext);

  return (
    <>
      <button
        className="player_listenLive"
        onClick={(e) => {
          e.preventDefault();
          context.resetLivePlayer(true);
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
  );
};

export default AudioListenLiveButton;
