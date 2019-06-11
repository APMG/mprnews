import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClickOutside(e, props) {
    var children = window.document.getElementsByTagName('*');
    for (var x in children) {
      if (children[x] !== e.Target) {
        return;
      }
    }
    props.forceCloseFunction(e);
  }

  handleKeyDown(e) {
    var key = e.which || e.keyCode;
    if (key !== 9) {
      // tab
      return;
    }

    var items = window.document.getElementsByTagName('button,a');
    var id = e.shiftKey ? 1 : items.length - 1;
    if (e.target == items[id]) {
      this.props.forceCloseFunction(e);
    }
  }

  /* Only have the click events enabled when the menu is open */
  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      window.addEventListener('click', this.handleClickOutside);
    } else if (!this.props.isOpen && prevProps.isOpen) {
      window.removeEventListener('click', this.handleClickOutside);
    }
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
