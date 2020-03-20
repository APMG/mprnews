import React from 'react';
import PropTypes from 'prop-types';

const NewspartnersLayout = (props) => {
  return <div className="newspartners">{props.children}</div>;
};

NewspartnersLayout.propTypes = {
  children: PropTypes.node
};

export default NewspartnersLayout;
