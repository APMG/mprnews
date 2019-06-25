import React, { useContext } from 'react';
import AudioPlayerContext from '../../context/AudioPlayerContext';
import AudioPlayer from './AudioPlayer';

const AudioWrapper = () => {
  const context = useContext(AudioPlayerContext);

  return (
    <AudioPlayer
      audioElementRef={context.audioElementRef}
      audioSource={context.audioSource}
      audioSubtitle={context.audioSubtitle}
      audioTitle={context.audioTitle}
      audioThumbnail={context.audioThumbnail}
      isAudioLive={context.isAudioLive}
      isPlayerVisible={context.isPlayerVisible}
      handleAudioButtonClick={context.handleAudioButtonClick}
      loadPlayer={context.loadPlayer}
      playerRef={context.playerRef}
      playerInstance={context.playerInstance}
    />
  );
};

export default AudioWrapper;
