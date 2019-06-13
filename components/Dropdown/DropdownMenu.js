// prettier-ignore
import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var items = this.props.isOpen ? this.props.children : null;
    return (
      <div
        className={
          'dropdownMenu' +
          (this.props.className ? ' ' + this.props.className : '')
        }
      >
        {this.props.toggle}
        <CSSTransitionGroup
          transitionName={'grow-from-' + this.props.direction}
          component="div"
          className="dropdownMenu_items"
          onKeyDown={this.handleKeyDown}
          transitionLeaveTimeout={100}
          transitionEnterTimeout={500}
        >
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
}

DropdownMenu.defaultProps = {
  direction: 'center',
  className: '',
  component: 'div'
};

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool,
  forceCloseFunction: PropTypes.func,
  toggle: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['center', 'right', 'left']),
  className: PropTypes.string,
  children: PropTypes.object
};

export default DropdownMenu;
