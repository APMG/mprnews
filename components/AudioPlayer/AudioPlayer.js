import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayerUI from './AudioPlayerUI';
import classNames from 'classnames';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadPlayer();
  }

  render() {
    const playerClasses = classNames({
      playerWrapper: true,
      'is-sticky': this.props.isAudioPlaying
    });
    return (
      <div className={playerClasses}>
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
  isAudioPlaying: PropTypes.bool,
  loadPlayer: PropTypes.func,
  playerRef: PropTypes.object
};

export default AudioPlayer;
