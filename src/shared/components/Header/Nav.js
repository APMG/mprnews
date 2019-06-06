import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import CaratDownIcon from '../Icons/CaratDown';

const Nav = (props) => {
  return (
    <nav className="nav">
      <ul className="nav_list">
        {props.items.map((item, index) => (
          <li key={index} className="nav_item">
            <Link to={item.to} className={props.dropdownClasses}>
              {item.text}
              <div className="nav_icon">
                <CaratDownIcon />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  dropdownClasses: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      to: PropTypes.string
    })
  )
};

export default Nav;
