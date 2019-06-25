import React from 'react';
import PropTypes from 'prop-types';

const ContentGrid = (props) => {
  return (
    <div className="gridContent">
      <div className="gridContent_main">{props.children}</div>
      <div className="gridContent_sidebar">{props.sidebar}</div>
    </div>
  );
};

ContentGrid.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.node
};

export default ContentGrid;
