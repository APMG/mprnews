import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import { Query } from 'react-apollo';
import QueryError from '../../components/QueryError/QueryError';
import query from './twitter.gql';
import { Loading } from '@apmg/titan';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import AudioPlayerContext from '../../context/AudioPlayerContext';

const Twitter = ({ slug }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
    }}
    errorPolicy="all"
  >
    {({ loading, error, data }) => {
      if (error) return <QueryError error={error.message} />;
      if (loading) return <Loading />;

      if (data.twitter === null) return <Error statusCode={404} />;

      return <TwitterInner twitter={data.twitter} />;
    }}
  </Query>
);

const TwitterInner = ({ twitter }) => {
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

TwitterInner.propTypes = {
  twitter: PropTypes.object
};

Twitter.propTypes = {
  slug: PropTypes.string
};

export default Twitter;
