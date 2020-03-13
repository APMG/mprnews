import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Heading, Link } from '@apmg/titan';
import InfoLink from '../../components/InfoLink/InfoLink';
import Elections2020 from '../../components/Logo/Elections2020';
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

  return (
    <>
      {isMounted && (
        <>
          <div className="home_railLinks">
            {props.showElectionLink && (
              <div className="section section-md">
                <Link
                  href="/[...slug]"
                  as="/politics/election-2020"
                  className="infoLink"
                >
                  <div className="infoLink_title" aria-label="2020 Elections">
                    <Heading level={2} className="hdg hdg-4">
                      <Elections2020 elementClass="logo-election-2020" />
                    </Heading>
                  </div>
                </Link>
              </div>
            )}
            <div className="section section-md">
              <Link href="[...slug]" as="/health/covid-19" className="infoLink">
                <div className="infoLink_title">
                  <Heading level={2} className="hdg hdg-4">
                    COVID-19
                  </Heading>
                </div>
              </Link>
              <div className="infoLink_description">
                <Heading level={3} className="link hdg hdg-5">
                  <a href="https://live.mprnews.org/Event/Your_COVID-19_questions_answered">
                    Your questions answered
                  </a>
                </Heading>
                <Heading level={3} className="link hdg hdg-5">
                  <a href="https://www.mprnews.org/story/2020/03/12/cancellations-increase-as-coronavirus-spreads">
                    Cancellations
                  </a>
                </Heading>
              </div>
            </div>
          </div>
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
  showElectionLink: PropTypes.bool
};

export default React.memo(HomeRail);
