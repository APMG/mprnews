import React from 'react';
import Link from 'next/link';

const FooterSubscribe = () => {
  return (
    <div className="footer_subscribe">
      <Link href="/newsletter" as="/newlsetter">
        <a className="link link-plain text-bold">
          Subscribe to email newsletters
        </a>
      </Link>
    </div>
  );
};

export default FooterSubscribe;
