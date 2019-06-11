import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

const Sidebar = () => {
  const programDate = format(new Date(), 'ddd');

  return (
    <div>
      <div>Sidebar content</div>
      <div>Ads/etc</div>
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
