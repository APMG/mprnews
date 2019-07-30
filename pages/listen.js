import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import Error from 'next/error';

const ListenPage = ({ errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
  return (
    <div className="playerWrapper playerWrapper-listenpage js-player">
      <div className="player player-listenpage">
        <div className="player_wrapper player_wrapper-listenpage">
          <div className="listen listen-highlight ">
            <Heading level={2}>Now Listening to Live Stream</Heading>
            <img
              className="listen_thumbnail"
              src="/static/MPRnews-default-audio-thumbnail.jpg"
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
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { layout: 'listen', errorCode };
  }

  return { layout: 'listen' };
};

ListenPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default ListenPage;
