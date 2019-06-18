import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayerUI from './AudioPlayerUI';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.formatTime = null;
    this.apmPlayer = null;
    this.playerRef = React.createRef();
  }

  componentDidMount() {
    let Player, AudioAnalytics, analytics;

    new Promise((resolve) => {
      Player = require('apm-html5-player').Player;
      AudioAnalytics = require('apm-html5-player').AudioAnalytics;
      resolve();
    }).then(
      () => {
        analytics = new AudioAnalytics();
        this.apmPlayer = new Player(this.playerRef.current).init();
        analytics.init({ audio: this.playerRef.current });
      },
      (error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);
      }
    );
  }

  render() {
    return (
      <div
        id="player"
        className="player js-player"
        role="region"
        aria-label="Audio Player"
        data-src={this.props.audioSource}
        ref={this.playerRef}
      >
        <audio
          id="main-audio"
          preload="metadata"
          src={this.props.audioSource}
          ref={this.props.audioElementRef}
        />
        <AudioPlayerUI {...this.props} />
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  audioElementRef: PropTypes.object,
  audioSource: PropTypes.string,
  audioTitle: PropTypes.string,
  handleAudioButtonClick: PropTypes.func
};

export default AudioPlayer;
