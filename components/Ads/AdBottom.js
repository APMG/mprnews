import React from 'react';
import Link from 'next/link';

const AdBottom = () => {
  return (
    <div id="mpr-mr-ads" className="ad">
      <Link href="/sponsor">
        <a className="ad_link">Sponsor us</a>
      </Link>
      <div id="mpr-ad-2" className="ad_slot ad_slot-mr" />
    </div>
  );
};

export default React.memo(AdBottom);
