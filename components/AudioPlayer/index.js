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
      isPlayerVisible={context.isPlayerVisible}
      handleAudioButtonClick={context.handleAudioButtonClick}
    />
  );
};

export default AudioWrapper;
