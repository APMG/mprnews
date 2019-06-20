import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icons/Icon';

const AudioPlayerUIControls = (props) => {
  return (
    <div className="player_controls">
      {props.audioPlaylist && (
        <button className="player_btn player_btn-medium" type="button">
          <span className="player_previous">
            <Icon name="previous" />
            <span className="invisible">Previous</span>
          </span>
        </button>
      )}

      {props.replay && (
        <button
          className="player_btn player_btn-medium"
          type="button"
          data-skip-back={props.replay}
        >
          <span className="player_replay">
            <Icon name="replay" />
            <span className="invisible">Replay 10 Seconds</span>
          </span>
        </button>
      )}

      <button
        className="player_btn player_btn-large player_btn-playpause js-player-play"
        type="button"
      >
        <span className="player_play">
          <Icon name="play" />
          <span className="invisible">Play</span>
        </span>
        <span className="player_pause">
          <Icon name="pause" />
          <span className="invisible">Pause</span>
        </span>
      </button>

      {props.forward && (
        <button
          className="player_btn player_btn-medium"
          type="button"
          data-skip-forward={props.forward}
        >
          <span className="player_forward">
            <Icon name="forward" />
            <span className="invisible">Forward 10 Seconds</span>
          </span>
        </button>
      )}

      {props.audioPlaylist && (
        <button className="player_btn player_btn-medium" type="button">
          <span className="player_next">
            <Icon name="next" />
            <span className="invisible">Next</span>
          </span>
        </button>
      )}
    </div>
  );
};

AudioPlayerUIControls.propTypes = {
  audioPlaylist: PropTypes.string,
  forward: PropTypes.number,
  replay: PropTypes.number
};

export default AudioPlayerUIControls;
