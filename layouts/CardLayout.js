import React from 'react';
import PropTypes from 'prop-types';

const CardLayout = (props) => <div className="card">{props.children}</div>;

CardLayout.propTypes = {
  children: PropTypes.any
};

export default CardLayout;
