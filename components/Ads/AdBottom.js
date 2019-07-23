import React from 'react';
import Link from 'next/link';

const AdBottom = () => {
  return (
    <div id="mpr-mr-ads" className="ad">
      <div id="mpr-ad-2" className="ad_slot ad_slot-mr" />
      <div className="ad_textWrapper">
        <div className="ad_text">Providing Support for MPR.</div>
        <div className="link">
          <Link href="https://www.mpr.org/sponsor">
            <a className="ad_link">Learn More</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdBottom);
