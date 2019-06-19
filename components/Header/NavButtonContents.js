import React from 'react';
import PropTypes from 'prop-types';

const NavButtonContents = (props) => {
  return (
    <>
      <div className="navIcon">
        <span />
        <span />
        <span />
      </div>
      <span className="invisible">{props.label}</span>
    </>
  );
};

NavButtonContents.propTypes = {
  label: PropTypes.string
};

export default NavButtonContents;
