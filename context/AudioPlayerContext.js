import React from 'react';

const AudioPlayerContext = React.createContext({
  audioElementRef: (el) => (this.audioElementRef = el),
  audioSource: '',
  audioTitle: '',
  audioSubtitle: '',
  isAudioPlaying: false,
  isPlayerVisible: false,
  isAudioLive: true,
  handleAudioButtonClick() {},
  loadPlayer() {},
  playerInstance: {},
  playerRef: (el) => (this.playerRef = el),
});

export default AudioPlayerContext;
