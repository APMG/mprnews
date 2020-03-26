import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import { Link } from '@apmg/titan';
import Icon from '../Icons/Icon';
import { linkByTypeHref, linkByTypeAs } from '../../utils/cjsutils';

const InfoLink = (props) => {
  const linkObj = () => {
    if (props.hrefType) {
      return {
        canonicalSlug: props.href,
        resourceType: props.hrefType
      };
    } else {
      return {
        canonicalSlug: props.href
      };
    }
  };

  const headlineLinkObj = () => {
    if (props.headlineHrefType) {
      return {
        canonicalSlug: props.headlineHref,
        resourceType: props.headlineHrefType
      };
    } else {
      return {
        canonicalSlug: props.headlineHref
      };
    }
  };

  return (
    <>
      <Link
        href={linkByTypeHref(linkObj())}
        as={linkByTypeAs(linkObj())}
        className="infoLink"
      >
        <div className="infoLink_wrapper">
          <Heading
            level={props.headingLevel}
            className={`hdg hdg-4 infoLink_title ${props.elementClass}`}
          >
            {props.title}
            <Icon name={props.icon} elementClass={props.elementClass} />
          </Heading>
        </div>
        {props.description && (
          <div className="infoLink_description">{props.description}</div>
        )}
      </Link>
      {props.headline && props.headlineHref && (
        <Link
          href={linkByTypeHref(headlineLinkObj())}
          as={linkByTypeAs(headlineLinkObj())}
          className="infoLink_headline link link-plain"
        >
          <Heading
            level={props.headingLevel + 1}
            className="hdg hdg-5 hdg-headline"
          >
            {props.headline}
          </Heading>
        </Link>
      )}
      {props.headline && props.liveHeadlineHref && (
        <a
          href={props.liveHeadlineHref}
          className="infoLink_liveHeadline link link-plain"
        >
          <Heading
            level={props.headingLevel + 1}
            className="hdg hdg-5 hdg-headline"
          >
            {props.headline}
          </Heading>
        </a>
      )}
    </>
  );
};

InfoLink.propTypes = {
  description: PropTypes.string,
  headingLevel: PropTypes.number.isRequired,
  headline: PropTypes.string,
  headlineHref: PropTypes.string,
  headlineHrefType: PropTypes.string,
  liveHeadlineHref: PropTypes.string,
  href: PropTypes.string.isRequired,
  hrefType: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  elementClass: PropTypes.string
};

export default InfoLink;
