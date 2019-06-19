import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayerUIContent from './AudioPlayerUIContent';
import AudioPlayerUITime from './AudioPlayerUITime';
import AudioPlayerUIControls from './AudioPlayerUIControls';
import AudioPlayerUISecondary from './AudioPlayerUISecondary';

const AudioPlayerUI = (props) => {
  return (
    <div className="player_wrapper">
      <div className="player_wrapper_content">
        <AudioPlayerUIContent
          title={props.audioTitle}
          subtitle={props.audioSubtitle}
          label={props.label}
        />
        <AudioPlayerUITime />
      </div>

      <AudioPlayerUIControls
        audioPlaylist={props.audioPlaylist}
        forward={props.forward}
        replay={props.replay}
      />

      <AudioPlayerUISecondary
        showVolume={props.showVolume}
        showActiveBars={props.showActiveBars}
      />
    </div>
  );
};

AudioPlayerUI.propTypes = {
  audioSubtitle: PropTypes.string,
  audioTitle: PropTypes.string,
  audioPlaylist: PropTypes.string,
  forward: PropTypes.number,
  replay: PropTypes.number,
  showVolume: PropTypes.bool,
  showActiveBars: PropTypes.bool,
  label: PropTypes.string
};

export default AudioPlayerUI;
