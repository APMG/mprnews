import React, { useEffect, useRef } from 'react';
import { Link } from '@apmg/titan';
import PropTypes from 'prop-types';

const AdBottom = (props) => {
  const { homepageTopic } = props;
  const adBottomRef = useRef(null);
  //Only push dataLayer in ad bottom bc adslot is always a house ad
  //Array passed in useEffect to only run once
  useEffect(() => {
    //do a check for the meta content
    //this will stop the Underwriting tag to fire three times
    if (homepageTopic === 'homepage') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'getAdSlot',
        contentTopic: 'homepage'
      });
    }
  }, []);
  return (
    <div id="mpr-mr-ads" className="ad">
      <div id="mpr-ad-2" className="ad_slot ad_slot-mr" ref={adBottomRef} />
      <div className="ad_textWrapper">
        <div className="ad_text">Providing Support for MPR.</div>
        <div className="link">
          <Link href="https://www.mprnews.org/underwriting" className="ad_link">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

AdBottom.propTypes = {
  homepageTopic: PropTypes.string
};
export default React.memo(AdBottom);
