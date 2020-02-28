import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { analyzeUrl } from '../../utils/cjsutils';

const ApmRelatedLinkOverride = (props) => {
  const { prefix, title, url } = props.nodeData.attrs;
  const { isInternal, href, as } = analyzeUrl(url);

  if (isInternal) {
    return (
      <Link className="apm-related-link" href={href} as={as}>
        <span className="apm-related-link-prefix">{prefix}</span> {title}
      </Link>
    );
  }

  return (
    <a className="apm-related-link" href={url}>
      <span className="apm-related-link-prefix">{prefix}</span> {title}
    </a>
  );
};

ApmRelatedLinkOverride.propTypes = {
  nodeData: PropTypes.object
};

export default ApmRelatedLinkOverride;
