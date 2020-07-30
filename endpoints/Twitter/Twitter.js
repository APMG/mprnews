import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import AudioPlayerContext from '../../context/AudioPlayerContext';
import { audioDownloadPrefix } from '../../utils/utils';

const Twitter = ({ data: { twitter } }) => {
  const context = useContext(AudioPlayerContext);
  return (
    <div className="twitter">
      <AudioPlayer
        audioElementRef={context.audioElementRef}
        audioSource={audioDownloadPrefix(
          twitter.audio[0].encodings[0].filename
        )}
        audioTitle={twitter.audio[0].title}
        loadPlayer={context.loadPlayer}
        playerRef={context.playerRef}
      />
    </div>
  );
};

Twitter.propTypes = {
  data: PropTypes.shape({
    twitter: PropTypes.object
  })
};

export default Twitter;
