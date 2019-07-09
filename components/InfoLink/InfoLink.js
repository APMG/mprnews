import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import Link from 'next/link';
import Icon from '../Icons/Icon';
import { linkByTypeHref, linkByTypeAs } from '../../utils/cjsutils';

const InfoLink = (props) => {
  return (
    <>
      <Link href={props.href}>
        <a className="infoLink">
          <Heading
            level={props.headingLevel}
            className="hdg hdg-3 infoLink_title"
          >
            {props.title} <Icon name={props.icon} />
          </Heading>
          {props.description && (
            <div className="infoLink_description">{props.description}</div>
          )}
        </a>
      </Link>
      {props.headline && props.headlineHref && (
        <Link
          href={linkByTypeHref(props.headlineHref)}
          as={linkByTypeAs(props.headlineHref)}
        >
          <a className="infoLink_headline link link-plain">
            <Heading
              level={props.headingLevel + 1}
              className="hdg hdg-5 hdg-headline"
            >
              {props.headline}
            </Heading>
          </a>
        </Link>
      )}
    </>
  );
};

InfoLink.propTypes = {
  description: PropTypes.string,
  headingLevel: PropTypes.number.isRequired,
  headline: PropTypes.string,
  headlineHref: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string
};

export default InfoLink;
