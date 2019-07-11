import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import AdBottom from '../../components/Ads/AdBottom';
import AdTop from '../../components/Ads/AdTop';

const Sidebar = () => {
  const programDate = format(new Date(), 'ddd');

  return (
    <div className="sidebar">
      <div className="section section-sm">
        <div className="hList">
          <Link href={`/schedule/${programDate.toLowerCase()}`}>
            <a className="link link-plain">Program Schedule</a>
          </Link>
          <Link href={`https://www.mpr.org/listen/stations`}>
            <a className="link link-plain">Station Directory</a>
          </Link>
        </div>
      </div>
      <div className="section-sm">
        <AdTop />
      </div>
      <div className="section-sm">
        <AdBottom />
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
