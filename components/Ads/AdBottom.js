import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const AdBottom = () => {
  const adBottomRef = useRef(null);
  //No array passed for useEffect
  //expected behavior is to let useEffect  run on rerender
  useEffect(() => {
    console.log('bottom ad in useEffect', adBottomRef);
  });
  return (
    <div id="mpr-mr-ads" className="ad">
      <div id="mpr-ad-2" className="ad_slot ad_slot-mr" ref={adBottomRef} />
      <div className="ad_textWrapper">
        <div className="ad_text">Providing Support for MPR.</div>
        <div className="link">
          <Link href="https://www.mprnews.org/underwriting">
            <a className="ad_link">Learn More</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdBottom);
