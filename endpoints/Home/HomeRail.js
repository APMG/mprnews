import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Link } from '@apmg/titan';
import InfoLink from '../../components/InfoLink/InfoLink';
import WeatherSidebar from '../../components/WeatherSidebar/WeatherSidebar';
import { dropdownLists } from '../../utils/navConfig';

const HomeRail = (props) => {
  const sections = dropdownLists[0].groups[0].links; // D R Y
  return (
    <>
      <Link href="/weather" as="/weather" className="infoLink">
        <div className="infoLink_title">
          <Heading level={2} className="hdg hdg-4">
            Forecast
          </Heading>
        </div>
        <div className="infoLink_description">
          <WeatherSidebar />
        </div>
      </Link>
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
            {sections.map((section) => {
              const href =
                section.href === 'weather'
                  ? '/weather'
                  : `/collection?slug=${section.href}`;
              return (
                <li key={`${section.text}${section.href}`}>
                  <Link
                    href={href}
                    as={`/${section.href}`}
                    className="link link-plain"
                  >
                    {section.text}
                  </Link>
                </li>
              );
            })}
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

export default React.memo(HomeRail);
