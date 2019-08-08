import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import AudioPlayerContext from '../../context/AudioPlayerContext';

const Twitter = ({ data: { twitter } }) => {
  console.log(twitter);
  const context = useContext(AudioPlayerContext);
  return (
    <div className="twitter">
      <AudioPlayer
        audioElementRef={context.audioElementRef}
        audioSource={twitter.audio[0].encodings[0].httpFilePath}
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
