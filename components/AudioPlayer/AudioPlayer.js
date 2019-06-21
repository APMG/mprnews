import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayerUI from './AudioPlayerUI';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadPlayer();
  }

  render() {
    return (
      <div
        id="player"
        className={`player js-player ${
          this.props.isAudioLive ? 'is-live' : 'is-prerecorded'
        }`}
        role="region"
        aria-label="Audio Player"
        data-src={this.props.audioSource}
        ref={this.props.playerRef}
      >
        <audio
          id="main-audio"
          preload="metadata"
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
  handleAudioButtonClick: PropTypes.func,
  isAudioLive: PropTypes.bool,
  loadPlayer: PropTypes.func,
  playerRef: PropTypes.object
};

export default AudioPlayer;
