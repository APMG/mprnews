import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Heading } from '@apmg/titan';
import WeatherSidebar from '../../components/WeatherSidebar/WeatherSidebar';
import InfoLink from '../../components/InfoLink/InfoLink';

const HomeRail = (props) => {
  const sections = [
    { text: 'Arts', href: 'arts' },
    { text: 'Books', href: 'arts/books' },
    { text: 'Business', href: 'business' },
    { text: 'Education', href: 'education' },
    { text: 'Environment', href: 'environment' },
    { text: 'Health', href: 'health' },
    { text: 'Lifestyle', href: 'lifestyle' },
    { text: 'Minnesota', href: 'minnesota' },
    { text: 'Politics', href: 'politics' },
    { text: 'Photos', href: 'photos' }
  ];

  return (
    <>
      <WeatherSidebar />
      <div className="home_railLinks">
        <div className="section section-md">
          <InfoLink
            title="Updraft"
            href="weather-and-climate/updraft"
            hrefType="collection"
            icon="updraft"
            description="with Paul Huttner"
            headingLevel={2}
            headline={props.updraft?.title}
            headlineHref={props.updraft?.canonicalSlug}
            headlineHrefType={props.updraft?.resourceType}
          />
        </div>
        <div className="section section-md">
          <InfoLink
            title="Traffic"
            description="Minnesota highways and streets"
            href="traffic"
            hrefType="page"
            icon="car"
            headingLevel={2}
          />
        </div>
        <div className="section section-md">
          <InfoLink
            title="Email Newsletters"
            description="The stories that matter, in your inbox"
            href="newsletter"
            hrefType="page"
            icon="mail"
            headingLevel={2}
          />
        </div>
      </div>
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
                <Link
                  href={`/collection?slug=${section.href}`}
                  as={`/${section.href}`}
                >
                  <a className="link link-plain">{section.text}</a>
                </Link>
              </li>
            ))}
            {/* TODO clean this up better with the one menu config to rule them all ticekt */}
            <li key="weather">
              <Link href={`/weather`} as={`/weather`}>
                <a className="link link-plain">Weather</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

HomeRail.propTypes = {
  updraft: PropTypes.shape({
    canonicalSlug: PropTypes.string,
    resourceType: PropTypes.string,
    title: PropTypes.string
  })
};

export default HomeRail;
