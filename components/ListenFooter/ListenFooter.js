import React from 'react';
import { Link } from '@apmg/titan';
import { Heading, Button } from '@apmg/titan';
import FooterSubscribe from '../Footer/FooterSubscribe';

const ListenFooter = () => (
  <div className="playerFooter">
    <div className="playerFooter_column">
      <div className="playerFooter_row">
        <Heading level={3} className="hdg hdg-5">
          Member supported
        </Heading>
      </div>
      <Button
        href="https://support.mpr.org/mprnews-web"
        type="primary"
        newWindow={true}
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
          <Link href="/schedule" className="link link-plain">
            Program Schedule
          </Link>
        </li>
        <li>
          <Link
            href="https://www.mpr.org/listen/stations"
            className="link link-plain"
          >
            Station Directory
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default ListenFooter;
