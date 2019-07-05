import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '../Icons/Icon';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import { dropdownLists } from '../../utils/dropdownConfig';

const Dropdown = () => {
  let [open, setOpen] = useState({
    0: false,
    1: false,
    2: false
  });

  const closeItem = (id) => {
    setOpen(
      {
        ...open,
        0: false,
        1: false,
        2: false
      },
      getToggle
    );
    open[id] = false;
  };

  const toggle = (id) => {
    open = { 0: false, 1: false, 2: false };
    open[id] = !open[id];
    setOpen({
      ...open
    });
  };

  const clickItem = (id) => {
    closeItem(id);
  };

  const getToggle = (text, onClick, isOpen) => {
    return (
      <button
        className={'nav_button' + (isOpen ? ' active' : '')}
        type="button"
        onClick={onClick}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        {text}
        <div className="icon icon-medium">
          <div className="nav_icon">
            <Icon elementClass="icon-chevronDown" name="chevronDown" />
          </div>
        </div>
      </button>
    );
  };

  useEffect(() => {
    document.title = `${Object.values(open)}`;
    console.log(open);
  });

  return (
    <div className="dropdown">
      {dropdownLists.map((dropdownList, i) => {
        return (
          <DropdownMenu
            isOpen={open[i]}
            toggle={getToggle(dropdownList.text, () => toggle(i), open[i])}
            direction={dropdownList.direction}
            key={dropdownList.text + i}
            className={dropdownList.className}
          >
            <ul
              role="menu"
              className={
                'dropdownMenu dropdownMenu-expand' + (open ? ' active' : '')
              }
            >
              {dropdownList.groups.map((group, index) =>
                !group.linkgroup ? null : (
                  <li
                    className="dropdownMenu_section"
                    key={group.linkgroup + index}
                    role="menuitem"
                  >
                    <div className="dropdownMenu_title">{group.linkgroup}</div>
                    <ul className="dropdownMenuItem" role="menu">
                      {group.links.map((item) =>
                        !item.href ? null : (
                          <DropdownMenuItem
                            key={item.text + i}
                            onClick={clickItem}
                          >
                            <Link href={item.href}>
                              <a
                                className={`dropdownMenuItem_link ${item.class}`}
                              >
                                {item.text}
                              </a>
                            </Link>
                          </DropdownMenuItem>
                        )
                      )}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </DropdownMenu>
        );
      })}
      <div className="nav_item nav_item-donate">
        <Link href="https://contribute.publicradio.org/contribute.php?refId=default&WT.mc_id=news_web_nav_button&WT.mc_ev=click&utm_campaign=membership_contribution&utm_medium=web_nav_button&utm_source=news&utm_content=&utm_terms">
          <a className="nav_link"> Give Now </a>
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
