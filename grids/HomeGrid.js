import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const HomeGrid = (props) => {
  const classes = classNames({
    home: true,
    'is-blowout': props.blowout
  });

  return (
    <div className={classes}>
      {props.top && <div className="home_top">{props.top}</div>}
      {props.widget && <div className="home_widget">{props.widget}</div>}
      <div className="home_first">{props.first}</div>
      <div className="home_main">{props.children}</div>
      <div className="home_rail">{props.rail}</div>
      <aside className="home_sidebar">{props.sidebar}</aside>
      <div className="home_footer">{props.footer}</div>
    </div>
  );
};

HomeGrid.propTypes = {
  blowout: PropTypes.bool,
  children: PropTypes.node,
  first: PropTypes.node,
  footer: PropTypes.node,
  rail: PropTypes.node,
  sidebar: PropTypes.node,
  top: PropTypes.node,
  widget: PropTypes.node
};

export default HomeGrid;
