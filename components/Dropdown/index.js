import React, { useState, useRef } from 'react';
import { Link } from '@apmg/titan';
import Icon from '../Icons/Icon';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import { dropdownLists } from '../../utils/navConfig';
import OutsideClick from '../OutsideClick/OutsideClick';
import { hrefType, hrefTypeAs } from '../../utils/utils';

const Dropdown = () => {
  const ref = useRef();
  const initialMenuState = [false, false, false];
  OutsideClick(ref, () => {
    closeMenus();
  });

  let [open, setOpen] = useState(initialMenuState);

  const closeMenus = () => {
    setOpen(initialMenuState);
  };

  const toggle = (id) => {
    if (open[id] === true) {
      return closeMenus();
    }
    let newOpen = [...initialMenuState];
    newOpen[id] = true;
    setOpen(newOpen);
  };

  const clickItem = () => {
    closeMenus();
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
                  'dropdownMenu dropdownMenu-expand dropdownMenu-' +
                  [i] +
                  (open ? ' active' : '')
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
                              <Link
                                href={hrefType(item)}
                                as={hrefTypeAs(item)}
                                className={`dropdownMenuItem_link ${item.class}`}
                                onClick={clickItem}
                              >
                                {/* eslint-disable-next-line */} {item.text}{' '}
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
        <Link href="https://support.mpr.org/mprnews-web" className="nav_link">
          Give Now
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
