import App, { Container } from 'next/app';
import React from 'react';
import withApolloClient from '../lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import AudioPlayerContext from '../context/AudioPlayerContext';

class MPRNews extends App {
  constructor(props) {
    super(props);
    this.audioElementRef = React.createRef();
    this.state = {
      audioElementRef: this.audioElementRef,
      audioSource: '',
      audioTitle: '',
      audioSubtitle: '',
      isAudioPlaying: false,
      isPlayerVisible: false,
      handleAudioButtonClick: this.handleAudioButtonClick
    };
  }

  componentDidMount() {
    this.state.audioElementRef.current?.addEventListener('pause', () => {
      if (this.state.isAudioPlaying === true) {
        this.setState({ isAudioPlaying: false });
      }
    });

    this.state.audioElementRef.current?.addEventListener('play', () => {
      if (this.state.isAudioPlaying === false) {
        this.setState({ isAudioPlaying: true });
      }
    });
  }

  handleAudioButtonClick = (audioSource, audioTitle, audioSubtitle) => {
    if (this.state.isAudioPlaying && this.state.audioSource === audioSource) {
      this.pauseAudio(audioSource, audioTitle, audioSubtitle);
    } else {
      this.playAudio(audioSource, audioTitle, audioSubtitle);
    }
  };

  playAudio(audioSource, audioTitle, audioSubtitle) {
    this.setState(
      { isAudioPlaying: true, audioSource, audioTitle, audioSubtitle },
      () => {
        this.state.audioElementRef.current.play();
      }
    );
  }

  pauseAudio(audioSource, audioTitle, audioSubtitle) {
    this.setState(
      { isAudioPlaying: false, audioSource, audioTitle, audioSubtitle },
      () => {
        this.state.audioElementRef.current.pause();
      }
    );
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
