import React from 'react';
import Link from 'next/link';

const AdTop = () => {
  return (
    <div id="mpr-mr-ads" className="ad">
      <Link href="/sponsor">
        <a className="ad_link">Sponsor us</a>
      </Link>
      <div id="mpr-ad-1" className="ad_slot ad_slot-mr"></div>
    </div>
  );
};

export default React.memo(AdTop);
