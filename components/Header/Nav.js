import React from 'react';
import PropTypes from 'prop-types';
import NavInner from './NavInner';

const Nav = (props) => {
  return (
    <>
      {props.dropdownLists.map((dropdownList, i) => (
        <NavInner
          groups={dropdownList.groups}
          closeMenu={props.closeMenu}
          key={i}
        ></NavInner>
      ))}
    </>
  );
};

Nav.propTypes = {
  closeMenu: PropTypes.func,
  dropdownLists: PropTypes.array
};

export default Nav;
