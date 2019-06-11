import React from 'react';
import Link from 'next/link';
import Icon from '../Icons/Icon';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        open: { 0: false, 1: false, 2: false }
      };
    }
  }

  closeItem = (id) => {
    var open = this.state.open;
    open[id] = false;
    open = { 0: false, 1: false, 2: false };
    this.setState(
      {
        open: open
      },
      this.getToggle
    );
  };

  toggle = (id) => {
    var open = this.state.open;
    open[id] = !open[id];
    this.setState({
      open: open
    });
  };

  clickItem = (id) => {
    this.closeItem(id);
  };

  getToggle = (text, onClick, isOpen) => {
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

  render() {
    var _dropdownLists = [
      {
        id: 'listOne',
        direction: 'center',
        text: 'Sections',
        icon: <Icon elementClass="icon-nav" name="chevronDown" />,
        groups: [
          {
            linkgroup: 'MPR News Coverage',
            links: [
              { text: 'Arts', class: '', href: '/arts' },
              { text: 'Education', class: '', href: '/education' },
              { text: 'Lifestyle', class: '', href: '/lifestyle' },
              { text: 'Twin Cities', class: '', href: '/twin-cities' },
              { text: 'Books', class: '', href: '/books' },
              { text: 'Environment', class: '', href: '/environment' },
              { text: 'Politics', class: '', href: '/politics' },
              { text: 'NewsCut', class: '', href: '/newscut' },
              { text: 'Business', class: '', href: '/business' },
              { text: 'Health', class: '', href: '/health' },
              { text: 'State', class: '', href: '/state' },
              { text: 'Weather', class: '', href: '/weather' }
            ]
          },
          {
            linkgroup: 'MPR News Programs',
            links: [
              { text: 'Morning Edition', class: '', href: '/morning-edition' },
              {
                text: 'All Things Considered',
                class: '',
                href: '/all-things-considered'
              },
              {
                text: 'MPR News with Kerri Miller',
                class: '',
                href: '/kerri-miller'
              },
              {
                text: 'MPR News with Angela Davis',
                class: '',
                href: '/angela-davis'
              },
              {
                text: 'MPR News Presents',
                class: '',
                href: '/mpr-news-presents'
              },
              { text: 'More programs', class: '', href: '/schedule' }
            ]
          },
          {
            linkgroup: 'MPR News Resources',
            links: [
              { text: 'Program Schedule', class: '', href: '/schedule' },
              {
                text: 'Station directory',
                class: '',
                href: 'https://www.mpr.org/listen/stations'
              },
              { text: 'Podcasts', class: '', href: '/podcasts' },
              { text: 'Archive', class: '', href: 'https://archive.mpr.org/' }
            ]
          }
        ]
      },
      {
        id: 'listTwo',
        direction: 'center',
        text: 'Members',
        icon: <Icon elementClass="icon-nav" name="chevronDown" />,
        groups: [
          {
            linkgroup: 'Member Info',
            links: [
              {
                text: 'Member benefits',
                class: '',
                href: 'https://www.mpr.org/members/benefits'
              },
              {
                text: 'Sustaining membership',
                class: '',
                href: 'https://www.mpr.org/members/sustainers'
              },
              {
                text: 'Contact Us',
                class: '',
                href: 'https://www.mpr.org/contact'
              },
              {
                text: 'Become a member',
                class: '',
                href:
                  'https://contribute.publicradio.org/contribute.php?refId=default&WT.mc_id=news_web_header_dropdown&WT.mc_ev=click&utm_campaign=membership_contribution&utm_medium=web_header_dropdown&utm_source=news&utm_content=&utm_term'
              }
            ]
          },
          {
            linkgroup: 'More ways to give',
            links: [
              {
                text: 'Give a gift membership',
                class: '',
                href: 'https://www.mpr.org/members/gift-membership'
              },
              {
                text: 'Leadership Circle',
                class: '',
                href: 'https://www.mpr.org/support/leadership-circle'
              },
              {
                text: 'Donata a vehicle',
                class: '',
                href: 'https://www.mpr.org/support/donate-vehicle'
              },
              {
                text: 'Employer matching gifts',
                class: '',
                href: 'https://www.mpr.org/members/match'
              },
              {
                text: 'Planned Giving',
                class: '',
                href: 'https://www.mpr.org/support/planned-giving'
              },
              {
                text: 'Donate stock',
                class: '',
                href: 'https://www.mpr.org/support/donate-stock'
              }
            ]
          }
        ]
      },

      {
        id: 'listThree',
        direction: 'center',
        text: 'More',
        icon: <Icon elementClass="icon-nav" name="chevronDown" />,
        groups: [
          {
            linkgroup: 'MPR Services',
            links: [
              {
                text: 'MPR News',
                class: 'mprnews',
                href: 'https://www.mprnews.org/'
              },
              {
                text: 'The Current',
                class: 'thecurrent',
                href: 'https://www.thecurrent.org/'
              },
              {
                text: 'Classical MPR',
                class: 'classical',
                href: 'https://www.classicalmpr.org/'
              },
              {
                text: 'Radio Heartland',
                class: '',
                href: 'https://www.thecurrent.org/heartland'
              },
              {
                text: 'Local Current',
                class: '',
                href: 'https://www.thecurrent.org/local'
              },

              {
                text: 'Choral Classical',
                href: 'https://www.classicalmpr.org/topic/choral'
              }
            ]
          },
          {
            linkgroup: 'MPR Information',
            links: [
              {
                text: 'About MPR',
                class: '',
                href: 'https://www.mpr.org/about'
              },
              {
                text: 'Contact Info',
                class: '',
                href: 'https://www.mpr.org/contact'
              },
              {
                text: 'Careers',
                class: '',
                href: 'https://apmgcareers.org'
              },
              {
                text: 'Company Information',
                class: '',
                href: 'https://www.mpr.org/about'
              },
              {
                text: 'Stations',
                class: '',
                href: 'https://www.mpr.org/listen/stations'
              },
              {
                text: 'Staff Directory',
                class: '',
                href: 'https://www.mpr.org/about/people'
              },
              {
                text: 'Press',
                class: '',
                href: 'https://www.mpr.org/press'
              },
              {
                text: 'Events',
                class: 'bold',
                href: 'https://www.mpr.org/calendar/'
              },
              {
                text: 'Shop',
                class: 'bold',
                href: 'https://www.publicmediamarket.org/collections/mpr-news'
              }
            ]
          }
        ]
      }
    ];

    return (
      <div className="dropdown">
        {_dropdownLists.map((dropdownList, i) => {
          return (
            <DropdownMenu
              isOpen={this.state.open[i]}
              forceCloseFunction={() => this.clickItem(i)}
              toggle={this.getToggle(
                dropdownList.text,
                () => this.toggle(i),
                this.state.open[i]
              )}
              direction={dropdownList.direction}
              key={dropdownList.text + i}
              className={dropdownList.className}
            >
              <ul
                role="menu"
                className={
                  'dropdownMenu dropdownMenu-expand' +
                  (this.state.open ? ' active' : '')
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
                        {group.links.map((item, index) =>
                          !item.href ? null : (
                            <DropdownMenuItem key={item.text + i}>
                              <Link
                                key={index}
                                href={item.href}
                                onClick={() => this.clickItem}
                              >
                                <a
                                  className={`dropdownMenuItem_link ${
                                    item.class
                                  }`}
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
  }
}
export default Dropdown;
