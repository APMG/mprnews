import React, { useContext } from 'react';
import AudioPlayerContext from '../../context/AudioPlayerContext';
import Icon from '../Icons/Icon';

const AudioListenLiveButton = () => {
  const context = useContext(AudioPlayerContext);
  const openInNewTab = () => {
    window.open('/listen', 'Listen Page', 'resizable,height=850,width=776');
  };

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

      <button
        className="player_popout"
        onClick={(e) => {
          e.preventDefault();
          openInNewTab();
          context.resetLivePlayer();
        }}
      >
        <Icon name="popout" />
        Open In New Tab
      </button>
    </>
  );
};

export default AudioListenLiveButton;
