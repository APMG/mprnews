import React from 'react';
import { Link } from '@apmg/titan';
import PropTypes from 'prop-types';

import Icon from '../Icons/Icon';

const Nav = (props) => {
  return (
    <nav className="nav">
      <ul className="nav_list">
        {props.items.map((item, index) => (
          <li key={index} className="nav_item">
            <button className="nav_button">
              {item.text}
              <div className="nav_icon">
                <Icon elementClass="icon-nav" name="chevronDown" />
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="nav_item nav_item-donate">
        <Link
          to="https://contribute.publicradio.org/contribute.php?refId=default&WT.mc_id=news_web_nav_button&WT.mc_ev=click&utm_campaign=membership_contribution&utm_medium=web_nav_button&utm_source=news&utm_content=&utm_terms"
          className="nav_link"
        >
          Give Now
        </Link>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      to: PropTypes.string
    })
  )
};

export default Nav;
