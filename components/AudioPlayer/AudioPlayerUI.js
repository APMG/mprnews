import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayerUIContent from './AudioPlayerUIContent';
import AudioPlayerUITime from './AudioPlayerUITime';
import AudioPlayerUIControls from './AudioPlayerUIControls';
import AudioPlayerThumbnail from './AudioPlayerThumbnail';

const AudioPlayerUI = (props) => {
  return (
    <div className="player_wrapper">
      <div className="player_wrapperContent">
        <AudioPlayerUITime />
        {props.audioThumbnail && (
          <AudioPlayerThumbnail
            audioTitle={props.audioTitle}
            audioThumbnail={props.audioThumbnail}
          />
        )}
        <AudioPlayerUIContent
          title={props.audioTitle}
          subtitle={props.audioSubtitle}
          label={props.label}
        />
      </div>

      <AudioPlayerUIControls
        audioPlaylist={props.audioPlaylist}
        forward={props.forward}
        replay={props.replay}
      />
    </div>
  );
};

AudioPlayerUI.propTypes = {
  audioSubtitle: PropTypes.string,
  audioTitle: PropTypes.string,
  audioPlaylist: PropTypes.string,
  audioThumbnail: PropTypes.string,
  forward: PropTypes.number,
  replay: PropTypes.number,
  label: PropTypes.string
};

export default AudioPlayerUI;
