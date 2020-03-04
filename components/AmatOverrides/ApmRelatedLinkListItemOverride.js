import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { analyzeUrl } from '../../utils/cjsutils';

const ApmRelatedLinkListItemOverride = (props) => {
  const { prefix, title, url } = props.nodeData.attrs;
  const { isInternal, href, as } = analyzeUrl(url);

  if (isInternal) {
    return (
      <li className="apm-related-link">
        <span className="apm-related-link-prefix">{prefix}</span>
        <Link href={href} as={as}>
          {title}
        </Link>
      </li>
    );
  }

  return (
    <li className="apm-related-link">
      <span className="apm-related-link-prefix">{prefix}</span>
      <a href={url}>{title}</a>
    </li>
  );
};

ApmRelatedLinkListItemOverride.propTypes = {
  nodeData: PropTypes.object
};

export default ApmRelatedLinkListItemOverride;
