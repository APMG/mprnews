import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import AdBottom from '../../components/Ads/AdBottom';
import AdTop from '../../components/Ads/AdTop';
import MostViewed from '../../components/MostViewed/MostViewed';
import PropTypes from 'prop-types';

const Sidebar = (props) => {
  const programDate = format(new Date(), 'iii');
  const { homepageTopic } = props;
  return (
    <div className="sidebar">
      <div className="section-sm">
        <AdTop />
      </div>
      <div className="section section-sm">
        <div className="hList">
          <Link
            href={`/schedule?slug=${programDate.toLowerCase()}`}
            as={`/schedule/${programDate.toLowerCase()}`}
            className="link link-plain"
          >
            Program Schedule
          </Link>
          <Link href={`https://www.mpr.org/listen/stations`}>
            <a className="link link-plain">Station Directory</a>
          </Link>
        </div>
      </div>
      <div className="section-sm">
        <MostViewed />
      </div>
      <div className="section-sm">
        <AdBottom homepageTopic={homepageTopic} />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  homepageTopic: PropTypes.string
};

export default Sidebar;
