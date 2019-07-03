import React from 'react';
import { Button, Heading } from '@apmg/titan';
import ListenLayout from '../layouts/ListenLayout';
import Link from 'next/link';
import FooterSubscribe from '../components/Footer/FooterSubscribe';
import Icon from '../components/Icons/Icon';

const ListenPage = () => {
  return (
    <ListenLayout>
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
        <div className="playerFooter">
          <div className="playerFooter_column">
            <div className="playerFooter_row">
              <Heading level={3} className="hdg hdg-5">
                Member supported
              </Heading>
            </div>
            <Button
              href="https://contribute.publicradio.org/contribute.php?refId=default&WT.mc_id=news_web_nav_button&WT.mc_ev=click&utm_campaign=membership_contribution&utm_medium=web_nav_button&utm_source=news&utm_content=&utm_terms"
              type="primary"
            >
              Become a Member
            </Button>
          </div>
          <div className="playerFooter_column">
            <div className="playerFooter_row">
              <FooterSubscribe />
            </div>
          </div>
          <div className="playerFooter_column">
            <div className="playerFooter_row">
              <Heading level={3} className="hdg hdg-5">
                Where to listen
              </Heading>
            </div>
            <ul className="vList">
              <li>
                <Link href="/schedule">
                  <a className="link link-plain">Program Schedule</a>
                </Link>
              </li>
              <li>
                <Link href="https://www.mpr.org/listen/stations">
                  <a className="link link-plain">Station Directory</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ListenLayout>
  );
};

export default ListenPage;
