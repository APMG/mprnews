import React from 'react';
import PropTypes from 'prop-types';

const ContentGrid = (props) => {
  return (
    <div className="contentGrid">
      <div className="contentGrid_main">{props.children}</div>
      <div className="contentGrid_sidebar">{props.sidebar}</div>
    </div>
  );
};

ContentGrid.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.node
};

export default ContentGrid;
