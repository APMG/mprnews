import React from 'react';

const AudioPlayerContext = React.createContext({
  audioElementRef: (el) => (this.audioElementRef = el),
  audioSource: '',
  audioTitle: '',
  audioSubtitle: '',
  isAudioPlaying: false,
  isPlayerVisible: false,
  handleAudioButtonClick() {}
});

export default AudioPlayerContext;
