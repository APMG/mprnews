import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const DropdownMenu = (props) => {
  let items = props.isOpen ? props.children : null;

  return (
    <div className="dropdownMenu">
      {props.toggle}
      <CSSTransitionGroup
        transitionName={'grow-from-center'}
        component="div"
        className="dropdownMenu_items"
        transitionLeaveTimeout={100}
        transitionEnterTimeout={500}
      >
        {items}
      </CSSTransitionGroup>
    </div>
  );
};

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.node.isRequired,
  children: PropTypes.object,
};

export default DropdownMenu;
