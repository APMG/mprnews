import React from 'react';
import { weatherConfig } from '../../../config/index';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  render() {
    return (
      <div
        className="dropdown"
        style={{ background: '#3c8fa4', width: '200px', border: '1px solid' }}
      >
        <div className="button" onClick={this.showDropdownMenu}>
          Other Locations
        </div>

        {this.state.displayMenu ? (
          <ul>
            {weatherConfig.map((event) => (
              <li key={event.id}>
                <a href={event.id}>{event.name}</a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
