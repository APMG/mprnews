import React from 'react';
import { Link } from '@apmg/titan';
import Logo from '../Logo/Logo';

const ListenHeader = () => (
  <div className="listenHeader">
    <Link href="/" className="listenHeader_logo" target="_blank">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="listenHeader_logoImg">
        <Logo />
        <span className="invisible">MPR News</span>
      </div>
    </Link>
  </div>
);

export default ListenHeader;
