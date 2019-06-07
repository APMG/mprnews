import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';

const MainLayout = (props) => {
  return (
    <>
      <Header />
      <div className="main">
        <div className="container">{props.children}</div>
      </div>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
