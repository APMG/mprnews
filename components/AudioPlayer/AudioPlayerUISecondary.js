import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icons/Icon';

const AudioPlayerUISecondary = (props) => {
  return (
    <div className="player_controls player_controlsSecondary">
      <button
        className="player_btn player_button-small js-player-mute"
        type="button"
      >
        <span
          className={`player_volume player_btn-medium ${
            props.audioVolume ? '' : 'invisible'
          }`}
        >
          <Icon name="volumeUp" />
          <span className="invisible">Volume</span>
        </span>
        <span className="player_mute player_btn-medium">
          <Icon name="volumeOff" />
          <span className="invisible">Mute Sound</span>
        </span>
      </button>

      {props.audioActiveBars && (
        <div className="player-wave player_btn-medium">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
};

AudioPlayerUISecondary.propTypes = {
  audioVolume: PropTypes.bool,
  audioActiveBars: PropTypes.bool,
};

export default AudioPlayerUISecondary;
