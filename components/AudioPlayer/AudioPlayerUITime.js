import React, { useContext } from 'react';
import AudioPlayerContext from '../../context/AudioPlayerContext';

const AudioPlayerUITime = () => {
  const context = useContext(AudioPlayerContext);
  const playerTimelineClass = context.isAudioLive
    ? 'player_timeline js-player-timeline player_timeline_hidden'
    : 'player_timeline js-player-timeline';

  return (
    <div className="player_timeWrapper">
      <div className="player_time player_time-current">
        <div className="player_liveLabel">On Air</div>
        <span className="player_time_current js-player-currentTime">0:00</span>
      </div>
      <div className={playerTimelineClass}>
        <div className="player_timeline_progress js-player-progress" />
        <div className="player_timeline_buffered js-player-buffered" />
        <div className="player_timeline_loading" />
      </div>
      <div className="player_time player_time-right player_time-duration">
        <span className="player_time_duration js-player-duration">0:00</span>
      </div>
    </div>
  );
};

export default AudioPlayerUITime;
