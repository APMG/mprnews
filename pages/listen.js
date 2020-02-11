import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { Heading } from '@apmg/titan';

const ListenPage = ({ errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <div className="playerWrapper playerWrapper-listenpage js-player">
      <div className="player player-listenpage">
        <div className="player_wrapper player_wrapper-listenpage">
          <div className="listen listen-highlight ">
            <Heading level={2}>Now Listening to Live Stream</Heading>
            <img
              className="listen_thumbnail"
              src="/MPRnews-default-audio-thumbnail.jpg"
              alt="Minnesota Public Radio Audio Stream Thumbnail"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ListenPage.getInitialProps = async ({ res }) => {
  if (res) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { layout: 'listen', errorCode };
  }

  return { layout: 'listen' };
};

ListenPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default ListenPage;
