import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

const Sidebar = () => {
  const programDate = format(new Date(), 'ddd');

  return (
    <div className="sidebar">
      <div>Sidebar content</div>
      <div className="sidebar_ad">
        <div style={{ width: '320px', height: '280px', background: '#cccccc' }}>
          Advertisement
        </div>
      </div>
      <Link href={`/schedule/${programDate.toLowerCase()}`}>
        <a>Program Schedule</a>
      </Link>
      <Link href={`https://www.mpr.org/listen/stations`}>
        <a>Station Directory</a>
      </Link>
    </div>
  );
};

export default Sidebar;
