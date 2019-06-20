import App, { Container } from 'next/app';
import React from 'react';
import withApolloClient from '../lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import AudioPlayerContext from '../context/AudioPlayerContext';

class MPRNews extends App {
  constructor(props) {
    super(props);
    this.audioElementRef = React.createRef();
    this.playerRef = React.createRef();
    this.defaultAudioSource = JSON.stringify([
      {
        url: 'https://nis.stream.publicradio.org/nis.aac',
        type: 'audio/aac'
      },
      {
        url: 'https://nis.stream.publicradio.org/nis.mp3',
        type: 'audio/mpeg'
      }
    ]);
    this.defaultAudioTitle = 'MPR News';

    this.state = {
      audioElementRef: this.audioElementRef,
      audioSource: this.defaultAudioSource,
      audioTitle: this.defaultAudioTitle,
      audioSubtitle: '',
      isAudioLive: true,
      isAudioPlaying: false,
      isPlayerVisible: false,
      handleAudioButtonClick: this.handleAudioButtonClick,
      loadPlayer: this.loadPlayer,
      playerInstance: null,
      playerRef: this.playerRef
    };
  }

  componentDidMount() {
    this.state.audioElementRef.current?.addEventListener('pause', () => {
      if (this.state.isAudioPlaying === true) {
        this.setState({ isAudioPlaying: false });
      }
    });

    this.state.audioElementRef.current?.addEventListener('play', () => {
      // This assumes we only have one possible live audio stream. Something else will need to be done to handle more
      this.setState({
        isAudioLive: this.state.audioSource === this.defaultAudioSource
      });

      if (this.state.isAudioPlaying === false) {
        this.setState({ isAudioPlaying: true });
      }
    });

    this.state.audioElementRef.current?.addEventListener('ended', () => {
      // Use the live player when audio playback completes
      this.setState({ isAudioLive: true });
      this.resetLivePlayer();
    });
  }

  loadPlayer = () => {
    let APMPlayer, Player, analytics;

    new Promise((resolve) => {
      APMPlayer = require('apm-html5-player');
      resolve();
    }).then(
      () => {
        Player = APMPlayer.Player;
        analytics = new APMPlayer.AudioAnalytics();
        this.state.playerInstance = new Player(
          this.state.playerRef.current
        ).init();
        analytics.init({ audio: this.state.playerRef.current });
      },
      (error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);
      }
    );
  };

  handleAudioButtonClick = (audioSource, audioTitle, audioSubtitle) => {
    if (this.state.isAudioPlaying && this.state.audioSource === audioSource) {
      this.pauseAudio(audioSource, audioTitle, audioSubtitle);
    } else if (
      this.state.isAudioPlaying &&
      this.state.audioSource !== audioSource
    ) {
      this.state.playerInstance.unloadAudio();
      this.playAudio(audioSource, audioTitle, audioSubtitle);
    } else {
      this.playAudio(audioSource, audioTitle, audioSubtitle);
    }
  };

  playAudio(audioSource, audioTitle, audioSubtitle) {
    if (this.state.playerInstance === null) return;

    this.setState(
      { isAudioPlaying: true, audioSource, audioTitle, audioSubtitle },
      () => {
        this.state.playerInstance.handlePlay();
      }
    );
  }

  pauseAudio(audioSource, audioTitle, audioSubtitle) {
    if (this.state.playerInstance === null) return;

    this.setState(
      { isAudioPlaying: false, audioSource, audioTitle, audioSubtitle },
      () => {
        this.state.playerInstance.handlePlay();
      }
    );
  }

  resetLivePlayer() {
    if (this.state.playerInstance === null) return;

    this.playerRef.current.setAttribute('data-src', this.defaultAudioSource);
    this.setState({
      audioTitle: this.defaultAudioTitle,
      audioSource: this.defaultAudioSource
    });
    this.state.playerInstance.unloadAudio();
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <AudioPlayerContext.Provider value={this.state}>
        <Container>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Container>
      </AudioPlayerContext.Provider>
    );
  }
}

export default withApolloClient(MPRNews);
