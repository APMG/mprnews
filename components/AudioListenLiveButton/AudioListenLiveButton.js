import React, { useContext } from 'react';
import AudioPlayerContext from '../../context/AudioPlayerContext';
import Icon from '../Icons/Icon';

const AudioListenLiveButton = () => {
  const context = useContext(AudioPlayerContext);
  const openInNewTab = () => {
    window.open('/listen', 'Listen Page', 'resizable,height=842,width=776');
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

      <a
        href="/listen"
        className="player_popout"
        onClick={(e) => {
          e.preventDefault();
          openInNewTab();
          context.resetLivePlayer();
        }}
      >
        <Icon name="popout" />
        Open In Popup
      </a>
    </>
  );
};

export default AudioListenLiveButton;
