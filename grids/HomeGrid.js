import React from 'react';
import PropTypes from 'prop-types';

const HomeGrid = (props) => {
  return (
    <div className="home">
      {props.top && <div className="home_top">{props.top}</div>}
      <div className="home_first">{props.first}</div>
      <div className="home_main">{props.children}</div>
      <div className="home_rail">{props.rail}</div>
      <aside className="home_sidebar">{props.sidebar}</aside>
      <div className="home_footer">{props.footer}</div>
    </div>
  );
};

HomeGrid.propTypes = {
  children: PropTypes.node,
  first: PropTypes.node,
  footer: PropTypes.node,
  rail: PropTypes.node,
  sidebar: PropTypes.node,
  top: PropTypes.node
};

export default HomeGrid;
