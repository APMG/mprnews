import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { analyzeUrl } from '../../utils/cjsutils';

const LinkOverride = (props) => {
  const { href, title, inner, className } = props;
  const { isInternal, href: internalHref, as } = analyzeUrl(href);
  let attrs = { href: href };

  if (title) {
    attrs.title = title;
  }
  if (className) {
    attrs.className = className;
  }
  if (inner.props.isAmp) {
    attrs.style = { color: '#00334e' };
  }

  if (isInternal) {
    return (
      <Link {...attrs} href={internalHref} as={as}>
        {inner}
      </Link>
    );
  }

  return <a {...attrs}>{inner}</a>;
};

LinkOverride.propTypes = {
  inner: PropTypes.object,
  href: PropTypes.string,
  isAmp: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string
};

export default LinkOverride;
