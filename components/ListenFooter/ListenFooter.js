import React from 'react';
import Link from 'next/link';
import { Heading } from '@apmg/titan';
import FooterSubscribe from '../Footer/FooterSubscribe';

const ListenFooter = () => (
  <div className="playerFooter">
    <div className="playerFooter_column">
      <div className="playerFooter_row">
        <Heading level={3} className="hdg hdg-5">
          Member supported
        </Heading>
      </div>
      {/* TODO: Make this back into a <Button> component when titan's <Button> gets fixed */}
      <Link href="https://contribute.publicradio.org/contribute.php">
        <a className="btn btn-primary">Become a Member</a>
      </Link>
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
);

export default ListenFooter;
