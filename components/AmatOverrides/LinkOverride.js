import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { analyzeUrl } from '../../utils/cjsutils';

const LinkOverride = (props) => {
  const { isInternal, href: internalHref, as } = analyzeUrl(props.href);

  if (isInternal) {
    return (
      <Link
        title={props.title}
        className={`apm-link ${props.className}`}
        href={internalHref}
        as={as}
      >
        {props.inner}
      </Link>
    );
  }

  return (
    <a
      title={props.title}
      className={`apm-link ${props.className}`}
      href={props.href}
      as={as}
    >
      {props.inner}
    </a>
  );
};

LinkOverride.propTypes = {
  inner: PropTypes.object,
  href: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string
};

export default LinkOverride;
