import React from 'react';
import PropTypes from 'prop-types';

class DropdownMenuItem extends React.Component {
  render() {
    var children = React.createElement(
      this.props.component,
      this.props.childrenProps,
      this.props.children
    );
    return <li>{children}</li>;
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
