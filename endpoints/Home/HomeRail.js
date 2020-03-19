import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Heading, Link } from '@apmg/titan';
import InfoLink from '../../components/InfoLink/InfoLink';
import WeatherSidebar from '../../components/WeatherSidebar/WeatherSidebar';
import { dropdownLists } from '../../utils/navConfig';
import { hrefType } from '../../utils/utils';

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const HomeRail = (props) => {
  const sections = dropdownLists[0].groups[0].links; // D R Y
  const isMounted = useMounted();
  const liveLink = props?.covid?.links?.find((link) => link.isLive === true);

  return (
    <>
      {isMounted && (
        <>
          <div className="home_railLinks">
            {props.covid?.links && (
              <div className="section section-md">
                <InfoLink
                  title="COVID-19"
                  href="health/covid-19"
                  hrefType="collection"
                  icon="covid19"
                  headingLevel={2}
                  headline={liveLink && liveLink.title}
                  liveHeadlineHref={liveLink && liveLink.href}
                  liveHeadlineHrefType="live"
                  classes="dark_red"
                />
                {props.covid?.links?.map((link) => {
                  if (link.isLive) {
                    return null;
                  }
                  return (
                    <div key={link.href} className="infoLink_description">
                      <ul className="bList bList-styled">
                        <li>
                          <a
                            className="link link-plain hdg hdg-5 hdg-headline"
                            href={link.href}
                          >
                            {link.title}
                          </a>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="section section-md">
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
            </div>
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
            {props.showElectionLink && (
              <div className="section section-md">
                <InfoLink
                  title="2020 Elections"
                  href="politics/election-2020"
                  hrefType="collection"
                  icon="checkmark"
                  description="Complete Election Coverage"
                  headingLevel={2}
                />
              </div>
            )}
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
                  return (
                    <li key={`${section.text}${section.href}`}>
                      <Link
                        href={hrefType(section)}
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
      )}
    </>
  );
};

HomeRail.propTypes = {
  updraft: PropTypes.shape({
    canonicalSlug: PropTypes.string,
    resourceType: PropTypes.string,
    title: PropTypes.string
  }),
  showElectionLink: PropTypes.bool,
  covid: PropTypes.shape({
    links: PropTypes.array
  })
};

export default React.memo(HomeRail);
