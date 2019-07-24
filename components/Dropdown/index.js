import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Icon from '../Icons/Icon';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import { dropdownLists } from '../../utils/navConfig';
import OutsideClick from '../OutsideClick/OutsideClick';
import { hrefType, hrefTypeAs } from '../../utils/utils';

const Dropdown = () => {
  const ref = useRef();
  const initialMenuState = { 0: false, 1: false, 2: false };
  OutsideClick(ref, () => {
    setOpen(initialMenuState);
  });

  let [open, setOpen] = useState(initialMenuState);

  const closeItem = (id) => {
    setOpen(initialMenuState, getToggle);
    open[id] = false;
  };

  const toggle = (id) => {
    if (open[id] === true) {
      open = initialMenuState;
      setOpen({
        ...open
      });
      return;
    }
    open = initialMenuState;
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

  return (
    <div className="dropdown">
      <span className="dropdown_ref" ref={ref}>
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
                      <div className="dropdownMenu_title">
                        {group.linkgroup}
                      </div>
                      <ul className="dropdownMenuItem" role="menu">
                        {group.links.map((item) =>
                          !item.href ? null : (
                            <DropdownMenuItem
                              key={item.text + i}
                              onClick={clickItem}
                            >
                              <Link href={hrefType(item)} as={hrefTypeAs(item)}>
                                {/* eslint-disable-next-line */}
                                <a
                                  className={`dropdownMenuItem_link ${item.class}`}
                                  onClick={(e) => {
                                    clickItem(e);
                                  }}
                                >
                                  {' '}
                                  {item.text}{' '}
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
      </span>
      <div className="nav_item nav_item-donate">
        <Link href="https://contribute.publicradio.org/contribute.php">
          <a className="nav_link"> Give Now </a>
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
