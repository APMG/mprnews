import React from 'react';
import { Link } from '@apmg/titan';

const AdTop = () => {
  return (
    <div id="mpr-mr-ads" className="ad">
      <div id="mpr-ad-1" className="ad_slot ad_slot-mr" />
      <div className="ad_textWrapper">
        <div className="ad_text">Providing Support for MPR.</div>
        <div className="link">
          <Link
            href="/page?slug=underwriting"
            as="/underwriting"
            className="ad_link"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdTop);
