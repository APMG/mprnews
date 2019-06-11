/* eslint-disable jsx-a11y/click-events-have-key-events*/
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
import React from 'react';
import PropTypes from 'prop-types';

class DropdownMenuItem extends React.Component {
  handleKeyDown = (e) => {
    var key = e.which || e.keyCode;
    if (key === 32) {
      // spacebar
      e.preventDefault(); // prevent page scrolling
      this.props.action();
    }
  };

  render() {
    var children = React.createElement(
      this.props.component,
      this.props.childrenProps,
      this.props.children
    );
    return <li onClick={this.props.action}>{children}</li>;
  }
}

DropdownMenuItem.defaultProps = {
  tabIndex: 0,
  component: 'div',
  childrenProps: {}
};

DropdownMenuItem.propTypes = {
  action: PropTypes.func,
  childrenProps: PropTypes.object,
  children: PropTypes.object,
  component: PropTypes.oneOf(['div', 'a'])
};

export default DropdownMenuItem;
