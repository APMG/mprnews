import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { analyzeUrl } from '../../utils/cjsutils';

const ampStyles = {
  prefix: {
    display: 'inline-block',
    marginRight: '.5em',
    fontWeight: '700'
  },
  link: {
    fontFamily: '"Roboto", system-ui, -apple-system, sans-serif',
    color: '#00334e'
  }
};

const ApmRelatedLinkOverride = ({ nodeData, isAmp }) => {
  const { prefix, title, url } = nodeData.attrs;
  const { isInternal, href, as } = analyzeUrl(url);

  if (isInternal) {
    return (
      <Link
        className="apm-related-link"
        href={href}
        as={as}
        style={isAmp ? ampStyles.link : null}
      >
        <span
          className="apm-related-link-prefix"
          style={isAmp ? ampStyles.prefix : null}
        >
          {prefix}
        </span>{' '}
        {title}
      </Link>
    );
  }

  return (
    <a
      className="apm-related-link"
      href={url}
      style={isAmp ? ampStyles.link : null}
    >
      <span
        className="apm-related-link-prefix"
        style={isAmp ? ampStyles.prefix : null}
      >
        {prefix}
      </span>{' '}
      {title}
    </a>
  );
};

ApmRelatedLinkOverride.propTypes = {
  isAmp: PropTypes.bool,
  nodeData: PropTypes.object
};

export default ApmRelatedLinkOverride;
