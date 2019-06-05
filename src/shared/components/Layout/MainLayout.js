import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = (props) => {
  return (
    <div className="main">
      <div className="container">{props.children}</div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
