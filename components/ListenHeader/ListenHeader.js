import React from 'react';
import Link from 'next/link';
import Logo from '../Logo/Logo';

const ListenHeader = () => (
  <div className="listenHeader">
    <Link href="/">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <a className="listenHeader_logo" target="_blank">
        <div className="listenHeader_logoImg">
          <Logo />
          <span className="invisible">MPR News</span>
        </div>
      </a>
    </Link>
  </div>
);

export default ListenHeader;
