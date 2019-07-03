import React from 'react';
import { Heading } from '@apmg/titan';

const ListenPage = () => {
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

ListenPage.getInitialProps = async () => {
  return { layout: 'listen' };
};

export default ListenPage;
