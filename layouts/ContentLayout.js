import React from 'react';
import PropTypes from 'prop-types';

const ContentLayout = (props) => {
  return (
    <div className="gridContent">
      <div className="gridContent_main">{props.children}</div>
      <div className="gridContent_sidebar">{props.sidebar}</div>
    </div>
  );
};

ContentLayout.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.node
};

export default ContentLayout;
