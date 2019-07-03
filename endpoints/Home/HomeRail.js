import React from 'react';
import Link from 'next/link';
import { Heading } from '@apmg/titan';
import WeatherSidebar from '../../components/WeatherSidebar/WeatherSidebar';

const HomeRail = () => {
  const sections = [
    { text: 'Arts', href: '/art' },
    { text: 'Education', href: '/education' },
    { text: 'Lifestyle', href: '/lifestyle' },
    { text: 'Twin Cities', href: '/twin-cities' },
    { text: 'Books', href: '/books' },
    { text: 'Environment', href: '/environment' },
    { text: 'Politics', href: '/politics' },
    { text: 'NewsCut', href: '/newscut' },
    { text: 'Business', href: '/business' },
    { text: 'Health', href: '/health' },
    { text: 'State', href: '/state' },
    { text: 'Weather', href: '/weather' }
  ];

  return (
    <>
      <div className="section section-md">
        <WeatherSidebar />
      </div>
      <div className="section section-md">Updraft</div>
      <div className="section section-md">Traffic</div>
      <div className="section section-md">Email Newsletters</div>
      <div className="home_railSections">
        <div className="module_header">
          <Heading level={3} className="hdg hdg-section hdg-section-small">
            Sections
          </Heading>
        </div>
        <div className="module_body">
          <ul className="vList">
            {sections.map((section) => (
              <li key={`${section.text}${section.href}`}>
                <Link href={section.href}>
                  <a className="link link-plain">{section.text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeRail;
