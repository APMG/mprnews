import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { analyzeUrl } from '../../utils/cjsutils';

const ampStyles = {
  related: {
    fontFamily: '"Roboto", system-ui, -apple-system, sans-serif'
  },
  prefix: {
    display: 'inline-block',
    marginRight: '.5em',
    fontWeight: '700'
  },
  link: {
    color: '#00334e',
    fontWeight: '700',
    margin: '0 0 0.5em'
  }
};

const ApmRelatedLinkListItemOverride = ({ nodeData, isAmp }) => {
  const { prefix, title, url } = nodeData.attrs;
  const { isInternal, href, as } = analyzeUrl(url);

  if (isInternal) {
    return (
      <li className="apm-related-link" style={isAmp ? ampStyles.related : null}>
        <span
          className="apm-related-link-prefix"
          style={isAmp ? ampStyles.prefix : null}
        >
          {prefix}
        </span>
        <Link href={href} as={as} style={isAmp ? ampStyles.link : null}>
          {title}
        </Link>
      </li>
    );
  }

  return (
    <li className="apm-related-link" style={isAmp ? ampStyles.related : null}>
      <span
        className="apm-related-link-prefix"
        style={isAmp ? ampStyles.prefix : null}
      >
        {prefix}
      </span>
      <a href={url} style={isAmp ? ampStyles.link : null}>
        {title}
      </a>
    </li>
  );
};

ApmRelatedLinkListItemOverride.propTypes = {
  isAmp: PropTypes.bool,
  nodeData: PropTypes.object
};

export default ApmRelatedLinkListItemOverride;
