import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from '@apmg/titan';
import query from './twitter.gql';
// import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
// import AudioPlayerContext from '../../context/AudioPlayerContext';

const Twitter = ({ slug }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>{`Error: ${error}`}</div>;
      if (loading) return <Loading />;

      return <TwitterInner twitter={data.twitter} />;
    }}
  </Query>
);

const TwitterInner = ({ twitter }) => {
  const context = useContext(AudioPlayerContext);
  return (
    <div className="twitter">
      {console.log(twitter)}
      <AudioPlayer
        audioElementRef={context.audioElementRef}
        // audioSource={twitter.audio.encodings}
        // audioSubtitle={context.audioSubtitle}
        audioTitle={twitter.audio.title}
        // isAudioLive={context.isAudioLive}
        // isPlayerVisible={context.isPlayerVisible}
        // handleAudioButtonClick={context.handleAudioButtonClick}
        loadPlayer={context.loadPlayer}
        // playerRef={context.playerRef}
        // playerInstance={context.playerInstance}
      />
    </div>
  );
};

TwitterInner.propTypes = {
  twitter: PropTypes.object
};

Twitter.propTypes = {
  slug: PropTypes.string
};

export default Twitter;
